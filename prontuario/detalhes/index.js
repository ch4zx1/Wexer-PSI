const userid = sessionStorage.getItem('userid');
const pacienteid = sessionStorage.getItem('iddopaciente');
const prontuarioid = sessionStorage.getItem('iddoprontuario');

async function checkuser()
{
	if(!userid)
	{
		window.location.href = "../../index.html";
	}
	else if(!pacienteid)
	{
		window.location.href = "../index.html";
	}
	else
	{
		try
		{
			const apiresponse = await fetch('https://wexer-backend.onrender.com/usuarios?id=' + userid);
			const response = await apiresponse.json();

			const nomeinteiro = response[0].nome;
			const email = response[0].email;
			const nome = nomeinteiro.split(' ')[0]; //separar nome por espaços
		
			const navbarnome = document.getElementById("navbar-nome");
			const nomedropdown = document.getElementById("nome-dropdown");
			const emaildropdown = document.getElementById("email-dropdown");

			navbarnome.innerHTML = "Bem-vindo(a), " + "<b>" + nome + "</b>";
			nomedropdown.innerHTML = nomeinteiro;
			emaildropdown.innerHTML = email;

			carregarbox()
		}
		catch(error)
		{
			const navbarnome = document.getElementById("navbar-nome");
			const nomedropdown = document.getElementById("nome-dropdown");
			const emaildropdown = document.getElementById("email-dropdown");

			navbarnome.innerHTML = "Erro ao carregar!";
			nomedropdown.innerHTML = "Erro ao carregar!";
			emaildropdown.innerHTML = "Erro ao carregar!";
		}
		
	}

} 

function deslogar()
{
	sessionStorage.clear();
	window.location.href = "../index.html";
}

function voltarprontuario()
{
	window.location.href = "../index.html";
}

async function carregarbox()
{
	try
	{
		const response = await fetch('https://wexer-backend.onrender.com/prontuario?id=' + prontuarioid);
		const prontuario = await response.json();

		const diasessao = prontuario[0].dia;
		const ano = diasessao.split('-')[0];
		const mes = diasessao.split('-')[1];
		const dia = diasessao.split('-')[2];
		let mesletra = "";

		if(mes === "01")
		{
			mesletra = "janeiro"
		}

		if(mes === "02")
		{
			mesletra = "fevereiro"
		}

		if(mes === "03")
		{
			mesletra = "março"
		}

		if(mes === "04")
		{
			mesletra = "abril"
		}

		if(mes === "05")
		{
			mesletra = "maio"
		}

		if(mes === "06")
		{
			mesletra = "junho"
		}

		if(mes === "07")
		{
			mesletra = "julho"
		}

		if(mes === "08")
		{
			mesletra = "agosto"
		}

		if(mes === "09")
		{
			mesletra = "setembro"
		}

		if(mes === "10")
		{
			mesletra = "outubro"
		}

		if(mes === "11")
		{
			mesletra = "novembro"
		}

		if(mes === "12")
		{
			mesletra = "dezembro"
		}

		const diadasessao = dia + " de " + mesletra + " de " + ano;

		const boxsessao = document.getElementById("boxsessaod");

		const injetar2 = `
		<div class="row">
					<div class="col-10">
						<div class="box-sd">
							<span>${prontuario[0].titulo}</span>
							<p>${diadasessao} | ${prontuario[0].horai}h - ${prontuario[0].horaf}h</p>
						</div>	
					</div>
					<div class="col-2 box-botoes">
						<button type="button" class="botao-acao editar-acao"><img src="../../svg/edit-2-line.svg" onclick="editardados(${prontuario[0].id})" alt="botao editar"></button>
						<button type="button" class="botao-acao apagar-acao"><img src="../../svg/trash-2.svg" onclick="confirmardeletar(${prontuario[0].id})" alt=""></button>
					</div>
				</div>	

				<div class="row">
					<div class="col">
						<div class="box-textos">
							<p>
								${prontuario[0].resumo}
							</p> 
						</div>
					</div>
				</div>

				<div class"container">
					<div class="row">
						<div class="col pagamento-b">
							<span>Pagamento<span>
						</div>
					</div>`
					boxsessao.innerHTML += injetar2

		if(prontuario[0].pagamento == 1)
		{
			if(prontuario[0].forma == 1)
			{
				if(prontuario[0].pagamento == 1)
				{
					const injetar3 = `
					<div class="row">
						<div class="col-2">
							<span class="tp">Valor</span><br>
							<span class="bp">${prontuario[0].valor}</span>
						</div>
						<div class="col-3">
							<span class="tp">Forma de pagamento</span><br>
							<span class="bp">Pix</span>
						</div>

						<div class="col">
							<span class="tp">Status</span><br>
							<span class="bp">Pago</span>
						</div>
					</div>
				</div>`
					boxsessao.innerHTML += injetar3
				}

			}
			else if(prontuario[0].forma == 2)
			{
				const injetar3 = `
				<div class="row">
					<div class="col-2">
						<span class="tp">Valor</span><br>
						<span class="bp">${prontuario[0].valor}</span>
					</div>
					<div class="col-3">
						<span class="tp">Forma de pagamento</span><br>
						<span class="bp">Dinheiro</span>
					</div>

					<div class="col">
						<span class="tp">Status</span><br>
						<span class="bp">Pago</span>
					</div>
				</div>
			</div>`
			
			boxsessao.innerHTML += injetar3
			}
			else if(prontuario[0].forma == 3)
			{
				const injetar3 = `
				<div class="row">
					<div class="col-2">
						<span class="tp">Valor</span><br>
						<span class="bp">${prontuario[0].valor}</span>
					</div>
					<div class="col-3">
						<span class="tp">Forma de pagamento</span><br>
						<span class="bp">Cartão de crédito</span>
					</div>

					<div class="col">
						<span class="tp">Status</span><br>
						<span class="bp">Pago</span>
					</div>
				</div>
			</div>`

				boxsessao.innerHTML += injetar3
			}
			else if(prontuario[0].forma == 4)
			{
				const injetar3 = `
				<div class="row">
					<div class="col-2">
						<span class="tp">Valor</span><br>
						<span class="bp">${prontuario[0].valor}</span>
					</div>
					<div class="col-3">
						<span class="tp">Forma de pagamento</span><br>
						<span class="bp">Cartão de débito</span>
					</div>

					<div class="col">
						<span class="tp">Status</span><br>
						<span class="bp">Pago</span>
					</div>
				</div>
			</div>`

				boxsessao.innerHTML += injetar3
			}
		}
		else if(prontuario[0].pagamento == 2)
		{
			if(prontuario[0].forma == 1)
			{
				if(prontuario[0].pagamento == 1)
				{
					const injetar3 = `
					<div class="row">
						<div class="col-2">
							<span class="tp">Valor</span><br>
							<span class="bp">${prontuario[0].valor}</span>
						</div>
						<div class="col-3">
							<span class="tp">Forma de pagamento</span><br>
							<span class="bp">Pix</span>
						</div>

						<div class="col">
							<span class="tp">Status</span><br>
							<span class="bp">Não pago</span>
						</div>
					</div>
				</div>`
					boxsessao.innerHTML += injetar3
				}

			}
			else if(prontuario[0].forma == 2)
			{
				const injetar3 = `
				<div class="row">
					<div class="col-2">
						<span class="tp">Valor</span><br>
						<span class="bp">${prontuario[0].valor}</span>
					</div>
					<div class="col-3">
						<span class="tp">Forma de pagamento</span><br>
						<span class="bp">Dinheiro</span>
					</div>

					<div class="col">
						<span class="tp">Status</span><br>
						<span class="bp">Não pago</span>
					</div>
				</div>
			</div>`
			
			boxsessao.innerHTML += injetar3
			}
			else if(prontuario[0].forma == 3)
			{
				const injetar3 = `
				<div class="row">
					<div class="col-2">
						<span class="tp">Valor</span><br>
						<span class="bp">${prontuario[0].valor}</span>
					</div>
					<div class="col-3">
						<span class="tp">Forma de pagamento</span><br>
						<span class="bp">Cartão de crédito</span>
					</div>

					<div class="col">
						<span class="tp">Status</span><br>
						<span class="bp">Não pago</span>
					</div>
				</div>
			</div>`

				boxsessao.innerHTML += injetar3
			}
			else if(prontuario[0].forma == 4)
			{
				const injetar3 = `
				<div class="row">
					<div class="col-2">
						<span class="tp">Valor</span><br>
						<span class="bp">${prontuario[0].valor}</span>
					</div>
					<div class="col-3">
						<span class="tp">Forma de pagamento</span><br>
						<span class="bp">Cartão de débito</span>
					</div>

					<div class="col">
						<span class="tp">Status</span><br>
						<span class="bp">Não pago</span>
					</div>
				</div>
			</div>`

				boxsessao.innerHTML += injetar3
			}
		}
	}
	catch(error)
	{
		alert("Não foi possivel carregar");
	}
}

async function confirmardeletar(id)
{
	try
	{
		const response = await fetch('https://wexer-backend.onrender.com/prontuario/'+ id);
		const prontuario = await response.json();

		const confirmmodal = new bootstrap.Modal('#abrirconfirmar');
		const confirmarid = document.getElementById('abrirconfirmar'); 
		confirmmodal.show(confirmarid);

		const botao = document.getElementById("confirmar-botoes");

		const injetar = 
		`<button type="button" id="confirm-apagar" class="btn btn-success modal-btn-confirmarsim"  onclick="deletarsessao(${prontuario.id})" data-bs-dismiss="modal">Sim</button>
		<button type="button" class="btn btn-success modal-btn-confirmarnao" data-bs-dismiss="modal">Não</button>`

		botao.innerHTML += injetar

		document.getElementById('abrirconfirmar').addEventListener('hide.bs.modal', async event => 
		{
			botao.innerHTML -= injetar
			botao.innerText = ""
		})
	}
	catch(error)
	{
		alert("Erro ao obter dados da API");
	}
}

async function deletarsessao(id)
{
	try
	{
		await fetch('https://wexer-backend.onrender.com/prontuario/' + id, 
		{
        	method: "DELETE"
      	})
		.then(response => 
			{
				if(!response.ok)
				{
					alert("Falha ao apagar, tente novamente.")
				}
				else
				{
					const sucessmodal = new bootstrap.Modal('#abrirsucessapagar');
					const sucessid = document.getElementById('abrirsucessapagar'); 
					sucessmodal.show(sucessid);
				}
			});
	}
	catch(error)
	{
		alert("Erro ao conectar a API")
	}
}

//

async function editardados(id)
{
	try
	{
		const requisicao =  await fetch('https://wexer-backend.onrender.com/prontuario?id=' + id); 
		const resposta = await requisicao.json();
		const fatosessao = resposta[0];

		if(fatosessao.tipo == 1)
		{
			document.getElementById('diaideditar').value = fatosessao.dia;
			document.getElementById('timestarteditar').value = fatosessao.horai;
			document.getElementById('timeendeditar').value = fatosessao.horaf;
			document.getElementById('sessao-tituloeditar').value = fatosessao.titulo;
			document.getElementById('resumo-texteditar').value = fatosessao.resumo;
			document.getElementById('valoreditar').value = fatosessao.valor;
			document.getElementById('tipopagamentoeditar').value = fatosessao.forma;

			if (fatosessao.pagamento == 1) 
			{
				document.getElementById('inlineRadio1editar').checked = true;
			}
			else if(fatosessao.pagamento == 2)
			{
				document.getElementById('inlineRadio2editar').checked = true;
			}
				
			const editarsessao = new bootstrap.Modal('#editarsessao');
			const sessaoid = document.getElementById('editarsessao'); 
			editarsessao.show(sessaoid);

			addbotaosalvarsessao(id);
		}
		
		if(fatosessao.tipo == 2)
		{
			document.getElementById('datafatoeditar').value = fatosessao.datafato;
			document.getElementById('fato-tituloeditar').value = fatosessao.titulofato;
			document.getElementById('descricaofatoeditar').value = fatosessao.descricaofato;

			const editarfato = new bootstrap.Modal('#editarfatos');
			const fatosid = document.getElementById('editarfatos'); 
			editarfato.show(fatosid);

			addbotaosalvarfatosf(id);
		}
	}
	catch(error)
	{
		alert("Erro ao obter dados da API");
	}
	
}

async function addbotaosalvarsessao(id)
{
	try
	{
		const response2 = await fetch('https://wexer-backend.onrender.com/prontuario/'+ id);
		const sessao = await response2.json();

		const botao2 = document.getElementById("ssinjetar");

		const injetar2 = 
		`<button type="button" class="btn botao-cancelar" data-bs-dismiss="modal">Cancelar</button>
		<button type="button" class="btn btn-primary btn-modal-criar" data-bs-dismiss="modal" onclick="salvarsessaof(${sessao.id})" id="salvarsessao">Salvar</button>`

		botao2.innerHTML += injetar2

		document.getElementById('editarsessao').addEventListener('hide.bs.modal', async event => 
		{
			botao2.innerHTML -= injetar2
			botao2.innerText = ""
		})
	}
	catch(error)
	{
		alert("Erro ao obter ID")
	}
}

function salvarsessaof(id)
{
	const dia = document.getElementById('diaideditar').value;
	const horai = document.getElementById('timestarteditar').value;
	const horaf = document.getElementById('timeendeditar').value;
	const titulo = document.getElementById('sessao-tituloeditar').value;
	const resumo = document.getElementById('resumo-texteditar').value;
	const valor = document.getElementById('valoreditar').value;
	const forma = document.getElementById('tipopagamentoeditar').value;

	if (document.getElementById('inlineRadio1editar').checked) 
	{
		const pagamento = document.getElementById('inlineRadio1editar').value;
		var radio2sf = pagamento;
	}
	
	if (document.getElementById('inlineRadio2editar').checked) 
	{
		const pagamento = document.getElementById('inlineRadio2editar').value;
		var radio2sf = pagamento;
	}

	if(!dia)
	{
		alert("Dia precisa ser preenchido")
	}
	else if(!horai)
	{
		alert("Hora de início precisa ser preenchido")
	}
	else if(!horaf)
	{
		alert("Hora fim precisa ser preenchido")
	}
	else if(!titulo)
	{
		alert("Titulo precisa ser preenchido")
	}
	else if(!resumo)
	{
		alert("Resumo precisa ser preenchido")
	}
	else
	{
		sessaoeditada = {
		
			tipo: 1,
			psicologoid: userid,
			pacienteid: pacienteid,
			dia: dia,
			horai: horai,
			horaf: horaf,
			titulo: titulo,
			resumo: resumo,
			valor: valor,
			forma: forma,
			pagamento: radio2sf,
		}
		atualizarsessaof(sessaoeditada, id)
	}
}

async function atualizarsessaof(sessao, id)
{
	await fetch('https://wexer-backend.onrender.com/prontuario/' + id,
	{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessao)
      }).then(response => 
		{
			if(!response.ok)
			{
				alert("Erro ao salvar")
			}
			else
			{
				const sucessmodal = new bootstrap.Modal('#abrirsucesseditar');
				const sucessid = document.getElementById('abrirsucesseditar'); 
				sucessmodal.show(sucessid);
			}
		});
}

//

document.getElementById('sucesseditarreload').addEventListener('click', function(e)
{
	e.preventDefault(); // prever duplo click)
	window.location.reload();
})

document.getElementById('sucessapagarreload').addEventListener('click', function(e)
{
	e.preventDefault(); // prever duplo click)
	window.location.href = "../index.html";
})

var currencyInput = document.querySelectorAll('input[type="currency"]');
for (var i = 0; i < currencyInput.length; i++) 
{

	var currency = 'BRL'
	onBlur({target: currencyInput[i]})

	currencyInput[i].addEventListener('focus', onFocus)
	currencyInput[i].addEventListener('blur', onBlur)

	function localStringToNumber(s)
	{
		return Number(String(s).replace(/[^0-9.-]+/g, ""))
	}

	function onFocus(e) 
	{
		var value = e.target.value;
		e.target.value = value ? localStringToNumber(value) : ''
	}

	function onBlur(e) 
	{
		var value = e.target.value

		var options = 
		{
			maximumFractionDigits: 2,
			currency: currency,
			style: "currency",
			currencyDisplay: "symbol"
		}

			e.target.value = (value || value === 0) ?
			localStringToNumber(value).toLocaleString(undefined, options) : ''
	}
}