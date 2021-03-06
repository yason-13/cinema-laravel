$(document).ready(function() {
	Carga();
});

function Carga() {
	var tablaDatos = $("#datos");
	var route = "/generos";

	$("#datos").empty();
	$.get(route, function(res){
		$(res).each(function(key, value){
			tablaDatos.append("<tr><td>"+value.genre+"</td><td class='text-center'><button value="+value.id+" OnClick='Mostrar(this);' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#exampleModal'>Editar</button><button value="+value.id+" OnClick='Eliminar(this);' class='btn btn-danger btn-sm ml-2'>Eliminar</button></td></tr>");
		});
	});
}

function Eliminar(btn) {
	var route = "/genero/"+btn.value+"";
	var token = $("#token").val();

	$.ajax({
		url: route,
		headers: {'X-CSRF-TOKEN': token},
		type: "DELETE",
		dataType: 'json',
		success: function(){
			Carga();
			$("#msj-danger").fadeIn();
		}
	});
}

function Mostrar(btn){
	var route = "/genero/"+btn.value+"/edit";

	$.get(route, function(res){
		$("#genre").val(res.genre);
		$("#id").val(res.id);
	});
}

$("#actualizar").click(function(){
	var value = $("#id").val();
	var dato = $("#genre").val();
	var route = "/genero/"+value+"";
	var token = $("#token").val();

	$.ajax({
		url: route,
		headers: {'X-CSRF-TOKEN': token},
		type: "PUT",
		dataType: 'json',
		data: {genre: dato},
		success: function(){
			Carga();
			$("#exampleModal").modal('toggle');
			$("#msj-success").fadeIn();
		}
	});
});