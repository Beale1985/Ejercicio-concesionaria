let autos = require ("./autos");
let persona = require ("./persona");


let concesionaria = {
   
   buscarAuto: function(patenteABuscar){
      for (i=0;i < autos.length;i++){
         let auto = autos[i];
         if (patenteABuscar == auto.patente){
            return auto
         }
      }
      return null
   },
   venderAuto:function(patenteABuscar){
      let autoAVender = this.buscarAuto(patenteABuscar);
      if (autoAVender != null){
         autoAVender.vendido = true;
      } 
   },
   autosParaLaVenta:function(){
      let autoALaVenta = autos.filter(function(auto){
               return auto.vendido != true
            });
      return autoALaVenta      
   },
   autosNuevos:function(){
      let listadoDeAutosALaVenta = this.autosParaLaVenta()
      let listaAutoNuevo = listadoDeAutosALaVenta.filter(function(listadoDeAutosALaVenta){
               return listadoDeAutosALaVenta.km <= 100
            });
   return listaAutoNuevo      
   },
   listaDeVentas:function(){
    
      let autoVendido = autos.filter(function(auto){
            return auto.vendido == true;
         })
         let autoVendido_precio = [];
         for (i=0; i< autoVendido.length;i++){
            autoVendido_precio.push(autoVendido[i].precio);   
         }
         return autoVendido_precio
   },
   totalDeVentas:function(){
      let totalGanancias = this.listaDeVentas();
      let resultado = 0;
      for (i=0; i< totalGanancias.length;i++){
         resultado = totalGanancias[i]+resultado;   
      }
      return resultado
   },
   puedeComprar: function(auto, persona){
      let valorDeCuotas = auto.precio/auto.cuotas;
       
      if (persona.capacidadDePagoEnCuotas >= valorDeCuotas && persona.capacidadDePagoTotal >= auto.precio){
         return true;      
      }else{
         return false;
      }
   },
   autosQuePuedeComprar: function(persona){
      let autosDisponiblesParaVender = this.autosParaLaVenta();
      let resultado = [];
      for (i=0; i< autosDisponiblesParaVender.length;i++){
         let valorDeCuotas = autosDisponiblesParaVender[i].precio/autosDisponiblesParaVender[i].cuotas;
         
         if (persona.capacidadDePagoEnCuotas >= valorDeCuotas && persona.capacidadDePagoTotal >= autosDisponiblesParaVender[i].precio){
            resultado.push(autosDisponiblesParaVender[i]);      
         }
         
      }
      return resultado
   } 
}

//concesionaria.puedeComprar(persona)
console.log(concesionaria.autosQuePuedeComprar(persona[0]))
//console.log(concesionaria.puedeComprar(autos[1], persona[0]))
//console.log(concesionaria.puedeComprar(persona[0], autos[1]))
//console.log(concesionaria.puedeComprar(persona[1], autos[0]))
//console.log(concesionaria.puedeComprar(persona[1], autos[1]))