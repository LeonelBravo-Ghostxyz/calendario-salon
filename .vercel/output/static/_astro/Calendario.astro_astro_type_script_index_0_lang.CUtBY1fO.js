let h=sessionStorage.getItem("salon_admin_pass")||null,u=!!h;const v=document.getElementById("calendarGrid"),M=document.getElementById("monthYearTitle"),y=document.getElementById("toastOverlay"),b=document.getElementById("toastBox");let a=new Date,$=[],x="",o=null;const _=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];async function w(){try{const e=await fetch("/api/eventos");e.ok&&($=await e.json())}catch(e){console.error(e)}finally{m()}}function m(){v.innerHTML="";const e=a.getFullYear(),t=a.getMonth();M.textContent=`${_[t]} ${e}`;const l=new Date(e,t,1).getDay(),p=new Date(e,t+1,0).getDate();for(let n=0;n<l;n++){const r=document.createElement("div");r.className="day-cell empty-cell",v.appendChild(r)}for(let n=1;n<=p;n++){const r=document.createElement("div");r.className="day-cell";const c=document.createElement("span");c.className="day-number",c.textContent=String(n),r.appendChild(c);const f=String(t+1).padStart(2,"0"),k=String(n).padStart(2,"0"),E=`${e}-${f}-${k}`,g=$.filter(s=>s.fecha===E);g.sort((s,d)=>s.turno==="Mediodía"?-1:1),g.forEach(s=>{const d=document.createElement("div");d.className=`event-badge ${s.turno==="Mediodía"?"badge-mediodia":""}`,d.textContent=`${s.turno.substring(0,1)}: ${s.cliente}`,u&&d.addEventListener("click",T=>{T.stopPropagation(),window.mostrarToastDatos(s)}),r.appendChild(d)}),u&&r.addEventListener("click",()=>{g.length>=2?alert("Este día ya tiene sus dos turnos (Mediodía y Noche) ocupados."):window.mostrarToastVacio(E)}),v.appendChild(r)}}window.cerrarToast=function(){y.classList.add("hidden")};window.mostrarToastVacio=function(e){x=e,b.innerHTML=`
      <div class="toast-flex">
        <h3 style="margin:0;">Día: ${e}</h3>
        <button class="toast-close" onclick="cerrarToast()">✖</button>
      </div>
      <p style="color:var(--text-muted); font-size:0.9rem;">No hay eventos seleccionados.</p>
      <button class="nav-btn" style="width:100%; background:#10b981; margin-top:0.5rem;" onclick="mostrarFormulario(false)">Añadir Reserva</button>
    `,y.classList.remove("hidden")};window.mostrarToastDatos=function(e){o=e,b.innerHTML=`
      <div class="toast-flex">
        <h3 style="margin:0;">${e.turno}</h3>
        <button class="toast-close" onclick="cerrarToast()">✖</button>
      </div>
      <div style="font-size:0.9rem; color:var(--text-color); line-height: 1.6;">
        <p><strong>Cliente:</strong> ${e.cliente}</p>
        <p><strong>Teléfono:</strong> ${e.telefono||"-"}</p>
        <p><strong>Registro:</strong> ${e.creado_en}</p>
        <p><strong>Notas:</strong> <br/>${e.notas||"-"}</p>
      </div>
      <div class="toast-btn-row">
        <button class="nav-btn" style="flex:1; background:rgba(239, 68, 68, 0.8);" 
                onclick="eliminarReserva('${e._id}')">Eliminar</button>
        
        <button class="nav-btn" style="flex:1; background:rgba(59, 130, 246, 0.8);" 
                onclick="mostrarFormulario(true)">Editar</button>
      </div>
    `,y.classList.remove("hidden")};window.mostrarFormulario=function(e){const t=e?o.turno:"Mediodía";b.innerHTML=`
      <div class="toast-flex">
        <h3 style="margin:0;">${e?"Editar":"Nueva"} Reserva</h3>
        <button class="toast-close" onclick="cerrarToast()">✖</button>
      </div>
      <form id="reservaForm">
        <input type="text" id="f_cliente" class="form-input" placeholder="Nombre del Cliente" value="${e?o.cliente:""}" required autocomplete="off" />

        <select id="f_socio" class="form-input">
          <option value="false" ${!e||!o.socio?"selected":""}>Cliente Regular</option>
          <option value="true" ${e&&o.socio?"selected":""}>Socio</option>
        </select>

        <select id="f_turno" class="form-input">
          <option value="Mediodía" ${t==="Mediodía"?"selected":""}>Mediodía</option>
          <option value="Noche" ${t==="Noche"?"selected":""}>Noche</option>
        </select>
        
        <input type="text" id="f_telefono" class="form-input" placeholder="Teléfono (Opcional)" value="${e?o.telefono:""}" autocomplete="off" />
        <textarea id="f_notas" class="form-input" placeholder="Añadir notas..." rows="3">${e?o.notas:""}</textarea>
        
        <button type="submit" class="nav-btn" style="width:100%; background:#10b981;">Guardar Reserva</button>
      </form>
    `,document.getElementById("reservaForm")?.addEventListener("submit",async l=>{l.preventDefault();const p={fecha:e?o.fecha:x,cliente:document.getElementById("f_cliente").value,socio:document.getElementById("f_socio").value==="true",turno:document.getElementById("f_turno").value,telefono:document.getElementById("f_telefono").value,notas:document.getElementById("f_notas").value,creado_en:e?o.creado_en:new Date().toLocaleString("es-AR")};try{const n=e?`/api/eventos/${o._id}`:"/api/eventos",c=await fetch(n,{method:e?"PUT":"POST",headers:{"Content-Type":"application/json","x-admin-password":h||""},body:JSON.stringify(p)}),f=await c.json();if(!c.ok){alert("Error de servidor: "+(f.error||"No autorizado"));return}window.cerrarToast(),w(),o=null}catch{alert("Error de red al intentar guardar la reserva.")}})};window.eliminarReserva=async function(e){if(!e){alert("Error: No se encontró el ID de la reserva.");return}if(confirm("¿Seguro que deseas eliminar el registro de esta fecha?"))try{const t=await fetch(`/api/eventos/${e}`,{method:"DELETE",headers:{"x-admin-password":h||""}});if(!t.ok){const l=await t.json();throw new Error(l.error||"No se pudo eliminar")}window.cerrarToast(),w()}catch(t){alert("Error al eliminar: "+t.message)}};const i=document.getElementById("btnUnlock");i.addEventListener("click",async()=>{if(u)sessionStorage.removeItem("salon_admin_pass"),window.location.reload();else{const e=prompt("Ingresa la clave de administrador:");if(e)try{i.textContent="⏳",(await fetch("/api/verify",{method:"POST",headers:{"x-admin-password":e}})).ok?(sessionStorage.setItem("salon_admin_pass",e),window.location.reload()):(alert("Contraseña incorrecta. Acceso denegado."),i.textContent="🔒")}catch{alert("Error al verificar la contraseña."),i.textContent="🔒"}}});u&&(i.textContent="🔓",i.style.background="rgba(16, 185, 129, 0.3)",i.title="Cerrar sesión");const I=document.getElementById("prevMonth"),S=document.getElementById("nextMonth");I.addEventListener("click",()=>{a.setMonth(a.getMonth()-1),m()});S.addEventListener("click",()=>{a.setMonth(a.getMonth()+1),m()});M.addEventListener("click",()=>{const e=prompt("Buscar (MM-YYYY):",`${String(a.getMonth()+1).padStart(2,"0")}-${a.getFullYear()}`);if(e&&e.includes("-")){const[t,l]=e.split("-");a.setMonth(parseInt(t,10)-1),a.setFullYear(parseInt(l,10)),m()}});w();
