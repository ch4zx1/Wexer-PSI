let linha = 0;

const userid = sessionStorage.getItem('userid');
const pacienteid = sessionStorage.getItem('iddopaciente');

async function checkuser()
{
	if(!userid)
	{
		window.location.href = "../index.html";
	}
	else if(!pacienteid)
	{
		window.location.href = "../dashboard/index.html";
	}
	else
	{
		try
		{
			carregartodos();
			carregarinformacoes();

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

async function carregarinformacoes()
{
	try
	{
		const requisicao =  await fetch('https://wexer-backend.onrender.com/pacientes?id=' + pacienteid); 
		const resposta = await requisicao.json();
		const paciente = resposta[0];

		const nascimento = paciente.nascimento;
		const ano = nascimento.split('-')[0];
		const mes = nascimento.split('-')[1];
		const dia = nascimento.split('-')[2];
		const datanascimento = dia + "/" + mes + "/" + ano;

		document.getElementById('nomep').textContent = paciente.nome;
		document.getElementById('nascimentop').textContent = datanascimento;
		document.getElementById('profissaop').textContent = paciente.profissao;
		document.getElementById('escolaridadep').textContent = paciente.escolaridade;
	}
	catch(error)
	{
		alert("Erro ao obter dados da API");
	}
}

var btn = document.querySelector("#back-to-top");
btn.addEventListener("click", function() 
{
    window.scrollTo(0, 0);
});


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

document.getElementById('criarsessao').addEventListener('click', async function(e)
{
	e.preventDefault(); // prever duplo click
	
	const dia = document.getElementById('diaid').value;
	const horai = document.getElementById('timestart').value;
	const horaf = document.getElementById('timeend').value;
	const titulo = document.getElementById('sessao-titulo').value;
	const resumo = document.getElementById('resumo-text').value;
	const valor = document.getElementById('valor').value;
	const forma = document.getElementById('tipopagamento').value;
	
	if (document.getElementById('inlineRadio1').checked) 
	{
		const pagamento = document.getElementById('inlineRadio1').value;
		var radio2criar = pagamento;
	}
	
	if (document.getElementById('inlineRadio2').checked) 
	{
		const pagamento = document.getElementById('inlineRadio2').value;
		var radio2criar = pagamento;
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
		novasessao = {
		
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
			pagamento: radio2criar,
		}
		salvar(novasessao)
	}
	
}
)

document.getElementById('criarfato').addEventListener('click', async function(e)
{
	e.preventDefault(); // prever duplo click
	
	const data = document.getElementById('datafato').value;
	const titulo = document.getElementById('fato-titulo').value;
	const descricao = document.getElementById('descricaofato').value;

	if(!data)
	{
		alert("Data precisa ser preenchido")
	}
	else if(!titulo)
	{
		alert("Titulo precisa ser preenchido")
	}
	else if(!descricao)
	{
		alert("Descrição precisa ser preenchido")
	}
	else
	{
		novofato = {
		
			tipo: 2,
			psicologoid: userid,
			pacienteid: pacienteid,
			datafato: data,
			titulofato: titulo,
			descricaofato: descricao,
		}
		salvar(novofato)
	}
	
}
)

async function salvar(dados)
{
	try
	{
		await fetch('https://wexer-backend.onrender.com/prontuario', 
		{
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(dados)
		}).then(response => 
		{
			if(!response.ok)
			{
				alert("Erro ao salvar")
			}
			else
			{
				const sucessmodal = new bootstrap.Modal('#abrirsucess');
				const sucessid = document.getElementById('abrirsucess'); 
				sucessmodal.show(sucessid);
			}
		});
	}
	catch(error)
	{
		alert("Erro ao salvar, tente novamente.")
	}
}

document.getElementById('sucessreload').addEventListener('click', function(e)
{
	e.preventDefault(); // prever duplo click)
	window.location.reload();
})

function abrirdetalhes(id)
{
	sessionStorage.setItem("iddoprontuario", id);
	window.location.href = "./detalhes/index.html";
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
		`<button type="button" id="confirm-apagar" class="btn btn-success modal-btn-confirmarsim"  onclick="deletarsessaofato(${prontuario.id})" data-bs-dismiss="modal">Sim</button>
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

async function deletarsessaofato(id)
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
					const sucessmodal = new bootstrap.Modal('#abrirsucess');
					const sucessid = document.getElementById('abrirsucess'); 
					sucessmodal.show(sucessid);
					document.getElementById('sucesstext').textContent = "Deletado com sucesso";
				}
			});
	}
	catch(error)
	{
		alert("Erro ao conectar a API")
	}
}

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
				const sucessmodal = new bootstrap.Modal('#abrirsucess');
				const sucessid = document.getElementById('abrirsucess'); 
				sucessmodal.show(sucessid);
				document.getElementById('sucesstext').textContent = "Atualizado com sucesso";
			}
		});
}

async function addbotaosalvarfatosf(id)
{
	try
	{
		const response1 = await fetch('https://wexer-backend.onrender.com/prontuario/'+ id);
		const fato = await response1.json();

		const botao1 = document.getElementById("sfinjetar");

		const injetar1 = 
		`<button type="button" class="btn botao-cancelar" data-bs-dismiss="modal">Cancelar</button>
		<button type="button" class="btn btn-primary btn-modal-criar" id="salvarfato" data-bs-dismiss="modal" onclick="salvarfatosf(${fato.id})">Salvar</button>`

		botao1.innerHTML += injetar1

		document.getElementById('editarfatos').addEventListener('hide.bs.modal', async event => 
		{
			botao1.innerHTML -= injetar1
			botao1.innerText = ""
		})
	}
	catch(error)
	{
		alert("Erro ao obter ID")
	}
}

function salvarfatosf(id)
{
	const data = document.getElementById('datafatoeditar').value;
	const titulo = document.getElementById('fato-tituloeditar').value;
	const descricao = document.getElementById('descricaofatoeditar').value;

	if(!data)
	{
		alert("Data precisa ser preenchido")
	}
	else if(!titulo)
	{
		alert("Titulo precisa ser preenchido")
	}
	else if(!descricao)
	{
		alert("Descrição precisa ser preenchido")
	}
	else
	{
		fatoseditados = 
		{
		
			tipo: 2,
			psicologoid: userid,
			pacienteid: pacienteid,
			datafato: data,
			titulofato: titulo,
			descricaofato: descricao,
		}
		atualizarfatosf(fatoseditados, id)
	}
}

async function atualizarfatosf(fatos, id)
{
	await fetch('https://wexer-backend.onrender.com/prontuario/' + id,
	{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fatos)
      	})
	  	.then(response => 
		{
			if(!response.ok)
			{
				alert("Erro ao salvar")
			}
			else
			{
				const sucessmodal = new bootstrap.Modal('#abrirsucess');
				const sucessid = document.getElementById('abrirsucess'); 
				sucessmodal.show(sucessid);
				document.getElementById('sucesstext').textContent = "Atualizado com sucesso";
			}
		});
}

function carregartodos()
{
	const local = document.getElementById("injetarsessaofato");
	const injetarfix = ``;
	local.innerHTML = injetarfix;
	linha = 0;


	const botao = document.getElementById("filtro-p1");

	const injetar = 
	`<div class="col-7">
	<hr style="width: 755px; margin-left: 10px; margin-top: 13px;"> 
	</div>
	<div class="col-2 filtrar-prontuario-todos">
		<span>Filtrar por:</span>
	</div>
	<div class="col-3 opcoes-prontuario">
		<div class="dropdown">
			<button class="btn btn-secondary dropdown-toggle botao-dpi" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			Todos
			</button>
			<ul class="dropdown-menu dp-menu">
			<li><button class="dropdown-item" type="button" onclick="carregartodos()">Todos</button></li>
			<li><button class="dropdown-item" type="button" onclick="carregarsessao()">Sessão</button></li>
			<li><button class="dropdown-item" type="button" onclick="carregarfatos()">Fato Relevante</button></li>
			</ul>
		</div>
	</div>`

	botao.innerHTML = injetar

	mostrarsf();
}

function carregarsessao()
{
	const local = document.getElementById("injetarsessaofato");
	const injetarfix = ``;
	local.innerHTML = injetarfix;
	linha = 0;

	const botao1 = document.getElementById("filtro-p1");

	const injetar1 = 
	`<div class="col-7">
	<hr style="width: 749px; margin-left: 10px; margin-top: 13px;"> 
	</div>
	<div class="col-2 filtrar-prontuario-sessao">
		<span>Filtrar por:</span>
	</div>
	<div class="col-3 opcoes-prontuario">
		<div class="dropdown">
			<button class="btn btn-secondary dropdown-toggle botao-dpi" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			Sessão
			</button>
			<ul class="dropdown-menu dp-menu">
			<li><button class="dropdown-item" type="button" onclick="carregartodos()">Todos</button></li>
			<li><button class="dropdown-item" type="button" onclick="carregarsessao()">Sessão</button></li>
			<li><button class="dropdown-item" type="button" onclick="carregarfatos()">Fato Relevante</button></li>
			</ul>
		</div>
	</div>`

	botao1.innerHTML = injetar1

	mostrars();
}

function carregarfatos()
{
	const local = document.getElementById("injetarsessaofato");
	const injetarfix = ``;
	local.innerHTML = injetarfix;
	linha = 0;

	const botao1 = document.getElementById("filtro-p1");

	const injetar1 = 
	`<div class="col-7">
	<hr style="width: 676px; margin-left: 10px; margin-top: 13px;"> 
	</div>
	<div class="col-2 filtrar-prontuario-fato">
		<span>Filtrar por:</span>
	</div>
	<div class="col-3 opcoes-prontuario">
		<div class="dropdown">
			<button class="btn btn-secondary dropdown-toggle botao-dpi" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			Fatos Relevantes
			</button>
			<ul class="dropdown-menu dp-menu">
			<li><button class="dropdown-item" type="button" onclick="carregartodos()">Todos</button></li>
			<li><button class="dropdown-item" type="button" onclick="carregarsessao()">Sessão</button></li>
			<li><button class="dropdown-item" type="button" onclick="carregarfatos()">Fato Relevante</button></li>
			</ul>
		</div>
	</div>`

	botao1.innerHTML = injetar1

	mostrarf();
}

async function mostrarsf()
{
	try
	{
		const requisicao = await fetch('https://wexer-backend.onrender.com/prontuario?pacienteid=' + pacienteid);
		const resposta = await requisicao.json();

		const local = document.getElementById("injetarsessaofato");

		for(let i = 0; i < resposta.length; i++)
		{
			if(resposta[i].tipo == 1)
			{
				const diasessao = resposta[i].dia;
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

				const resumocompleto = resposta[i].resumo.trim();
				const resumocortado = resumocompleto.slice(0, 280);

				const vermais = document.getElementById('more-link-' + i);

				/*if (resumocompleto.length > 320) 
				{
					vermais.style.display = 'inline';
				}
				else
				{
					vermais.style.display = 'none';
				}
				*/

				const dadossessao = `<div class="container box-widget">
				<div class="linha-canto">
				</div>
				<div class="row">
					<div class="col-0 imagem-ellipse">
						<img src="../svg/Vector.svg">
					</div>
					<div class="col d-flex justify-content-end">
						<div class="dropdown">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false" class="botao-opcoes">
                              ...
                            </button>
                            <ul class="dropdown-menu botao-dp">
                              <li><button class="dropdown-item botao-dp-editar" onclick="editardados(${resposta[i].id})"><img src="../svg/pencil-line.svg" alt="Imagem de Pincel">Editar</button></li>
                              <li><button class="dropdown-item botao-dp-apagar" onclick="confirmardeletar(${resposta[i].id})"><img src="../svg/delete-bin-5-line.svg" alt="Imagem de Lixeira">Excluir</button></li>
                            </ul>
                          </div>
					</div>
					<div class="row">
						<div class="col-0 titulo-sessao">
							<button type="button" class="nomebotao" onclick="abrirdetalhes(${resposta[i].id})">${resposta[i].titulo}</button>
							<p>${diadasessao}</p>
						</div>
					</div>

					<div class="row">
						<div class="col body-sessao">
							<span>
							${resumocortado}
							<a href="#" id="more-link-${i}" class="link-vermais" onclick="abrirdetalhes(${resposta[i].id})">Ver mais...</a>
							</span>
						</div>
					</div>
				</div>
				</div>`

				if(linha > 0)
				{
					local.innerHTML += `<div class="linha-vertical" style="border-color: #00995D"></div>`;
				}
				local.innerHTML += dadossessao;
			}
			
			if(resposta[i].tipo == 2)
			{
				const datafato = resposta[i].datafato;
				const ano = datafato.split('-')[0];
				const mes = datafato.split('-')[1];
				const dia = datafato.split('-')[2];
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

				const datadofato = dia + " de " + mesletra + " de " + ano;

				const dadosfato = `<div class="container box-fatos">
				<div class="linha-canto-fatos">
				</div>
				<div class="row">
					<div class="col-0 imagem-ellipse-fatos">
						<img src="../svg/vector-pin.svg">
					</div>
					<div class="col d-flex justify-content-end">
						<div class="dropdown">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false" class="botao-opcoes">
                              ...
                            </button>
                            <ul class="dropdown-menu botao-dp">
                              <li><button class="dropdown-item botao-dp-editar" onclick="editardados(${resposta[i].id})"><img src="../svg/pencil-line.svg" alt="Imagem de Pincel">Editar</button></li>
                              <li><button class="dropdown-item botao-dp-apagar" onclick="confirmardeletar(${resposta[i].id})"><img src="../svg/delete-bin-5-line.svg" alt="Imagem de Lixeira">Excluir</button></li>
                            </ul>
                          </div>
					</div>
					<div class="row">
						<div class="col-0 titulo-fatos">
							<span>${resposta[i].titulofato}</span>
							<p>${datadofato}</p>
						</div>
					</div>

					<div class="row">
						<div class="col body-fatos">
							<span>${resposta[i].descricaofato}</span>
						</div>
					</div>
				</div>
			</div>`

				if(linha > 0)
				{
					local.innerHTML += `<div class="linha-vertical" style="border-color: #2F80ED"></div>`;
				}
				
				local.innerHTML += dadosfato;
				
			}
			linha += linha + 1;

		}
	}
	catch(error)
	{
		alert("Erro ao recupear dados da API")
	}
}

async function mostrars()
{
	try
	{
		const requisicao = await fetch('https://wexer-backend.onrender.com/prontuario?pacienteid=' + pacienteid);
		const resposta = await requisicao.json();

		const local = document.getElementById("injetarsessaofato");

		for(let i = 0; i < resposta.length; i++)
		{
			if(resposta[i].tipo == 1)
			{
				const diasessao = resposta[i].dia;
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

				const resumocompleto = resposta[i].resumo.trim();
				const resumocortado = resumocompleto.slice(0, 280);

				const vermais = document.getElementById('more-link-' + i);

				/*if (resumocompleto.length > 320) 
				{
					vermais.style.display = 'inline';
				}
				else
				{
					vermais.style.display = 'none';
				}
				*/

				const dadossessao = `<div class="container box-widget">
				<div class="linha-canto">
				</div>
				<div class="row">
					<div class="col-0 imagem-ellipse">
						<img src="../svg/Vector.svg">
					</div>
					<div class="col d-flex justify-content-end">
						<div class="dropdown">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false" class="botao-opcoes">
                              ...
                            </button>
                            <ul class="dropdown-menu botao-dp">
                              <li><button class="dropdown-item botao-dp-editar" onclick="editardados(${resposta[i].id})"><img src="../svg/pencil-line.svg" alt="Imagem de Pincel">Editar</button></li>
                              <li><button class="dropdown-item botao-dp-apagar" onclick="confirmardeletar(${resposta[i].id})"><img src="../svg/delete-bin-5-line.svg" alt="Imagem de Lixeira">Excluir</button></li>
                            </ul>
                          </div>
					</div>
					<div class="row">
						<div class="col-0 titulo-sessao">
							<button type="button" class="nomebotao" onclick="abrirdetalhes(${resposta[i].id})">${resposta[i].titulo}</button>
							<p>${diadasessao}</p>
						</div>
					</div>

					<div class="row">
						<div class="col body-sessao">
						<span>
						${resumocortado}
						<a href="#" id="more-link-${i}" class="link-vermais" onclick="abrirdetalhes(${resposta[i].id})">Ver mais...</a>
						</span>
						</div>
					</div>
				</div>
				</div>`

				if(linha > 0)
				{
					local.innerHTML += `<div class="linha-vertical" style="border-color: #00995D"></div>`;
				}
				local.innerHTML += dadossessao;

				linha = linha + 1;
			}

		}
	}
	catch(error)
	{
		alert("Erro ao recupear dados da API")
	}
}

async function mostrarf()
{
	try
	{
		const requisicao = await fetch('https://wexer-backend.onrender.com/prontuario?pacienteid=' + pacienteid);
		const resposta = await requisicao.json();

		const local = document.getElementById("injetarsessaofato");

		for(let i = 0; i < resposta.length; i++)
		{
			if(resposta[i].tipo == 2)
			{
				const datafato = resposta[i].datafato;
				const ano = datafato.split('-')[0];
				const mes = datafato.split('-')[1];
				const dia = datafato.split('-')[2];
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

				const datadofato = dia + " de " + mesletra + " de " + ano;

				const dadosfato = `<div class="container box-fatos">
				<div class="linha-canto-fatos">
				</div>
				<div class="row">
					<div class="col-0 imagem-ellipse-fatos">
						<img src="../svg/vector-pin.svg">
					</div>
					<div class="col d-flex justify-content-end">
						<div class="dropdown">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false" class="botao-opcoes">
                              ...
                            </button>
                            <ul class="dropdown-menu botao-dp">
                              <li><button class="dropdown-item botao-dp-editar" onclick="editardados(${resposta[i].id})"><img src="../svg/pencil-line.svg" alt="Imagem de Pincel">Editar</button></li>
                              <li><button class="dropdown-item botao-dp-apagar" onclick="confirmardeletar(${resposta[i].id})"><img src="../svg/delete-bin-5-line.svg" alt="Imagem de Lixeira">Excluir</button></li>
                            </ul>
                          </div>
					</div>
					<div class="row">
						<div class="col-0 titulo-fatos">
							<span>${resposta[i].titulofato}</span>
							<p>${datadofato}</p>
						</div>
					</div>

					<div class="row">
						<div class="col body-fatos">
							<span>${resposta[i].descricaofato}</span>
						</div>
					</div>
				</div>
			</div>`

				if(linha > 0)
				{
					local.innerHTML += `<div class="linha-vertical" style="border-color: #2F80ED"></div>`;
				}
				
				local.innerHTML += dadosfato;

				linha += linha + 1;
				
			}
		}
	}
	catch(error)
	{
		alert("Erro ao recupear dados da API")
	}
}

async function pesquisap()
{
	try 
	{
		entradapesquisa = document.getElementById("pesquisar-prontuario").value
		const response = await fetch("https://wexer-backend.onrender.com/prontuario?q=" + entradapesquisa);
		const resposta = await response.json();

		if(entradapesquisa === '')
		{
			location.reload();
		}
		const local = document.getElementById("injetarsessaofato");

		const zero = ''
		local.innerHTML = zero
		linha = 0;
		

		for(let i = 0; i < resposta.length; i++)
		{
			if(resposta[i].pacienteid === pacienteid)
			{
				if(resposta[i].tipo == 1)
			{
				const diasessao = resposta[i].dia;
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

				const resumocompleto = resposta[i].resumo.trim();
				const resumocortado = resumocompleto.slice(0, 280);

				const vermais = document.getElementById('more-link-' + i);

				/*if (resumocompleto.length > 320) 
				{
					vermais.style.display = 'inline';
				}
				else
				{
					vermais.style.display = 'none';
				}
				*/

				const dadossessao = `<div class="container box-widget">
				<div class="linha-canto">
				</div>
				<div class="row">
					<div class="col-0 imagem-ellipse">
						<img src="../svg/Vector.svg">
					</div>
					<div class="col d-flex justify-content-end">
						<div class="dropdown">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false" class="botao-opcoes">
                              ...
                            </button>
                            <ul class="dropdown-menu botao-dp">
                              <li><button class="dropdown-item botao-dp-editar" onclick="editardados(${resposta[i].id})"><img src="../svg/pencil-line.svg" alt="Imagem de Pincel">Editar</button></li>
                              <li><button class="dropdown-item botao-dp-apagar" onclick="confirmardeletar(${resposta[i].id})"><img src="../svg/delete-bin-5-line.svg" alt="Imagem de Lixeira">Excluir</button></li>
                            </ul>
                          </div>
					</div>
					<div class="row">
						<div class="col-0 titulo-sessao">
							<button type="button" class="nomebotao" onclick="abrirdetalhes(${resposta[i].id})">${resposta[i].titulo}</button>
							<p>${diadasessao}</p>
						</div>
					</div>

					<div class="row">
						<div class="col body-sessao">
							<span>
							${resumocortado}
							<a href="#" id="more-link-${i}" class="link-vermais" onclick="abrirdetalhes(${resposta[i].id})">Ver mais...</a>
							</span>
						</div>
					</div>
				</div>
				</div>`

				if(linha > 0)
				{
					local.innerHTML += `<div class="linha-vertical" style="border-color: #00995D"></div>`;
				}
				local.innerHTML += dadossessao;
			}
			
			if(resposta[i].tipo == 2)
			{
				const datafato = resposta[i].datafato;
				const ano = datafato.split('-')[0];
				const mes = datafato.split('-')[1];
				const dia = datafato.split('-')[2];
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

				const datadofato = dia + " de " + mesletra + " de " + ano;

				const dadosfato = `<div class="container box-fatos">
				<div class="linha-canto-fatos">
				</div>
				<div class="row">
					<div class="col-0 imagem-ellipse-fatos">
						<img src="../svg/vector-pin.svg">
					</div>
					<div class="col d-flex justify-content-end">
						<div class="dropdown">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false" class="botao-opcoes">
                              ...
                            </button>
                            <ul class="dropdown-menu botao-dp">
                              <li><button class="dropdown-item botao-dp-editar" onclick="editardados(${resposta[i].id})"><img src="../svg/pencil-line.svg" alt="Imagem de Pincel">Editar</button></li>
                              <li><button class="dropdown-item botao-dp-apagar" onclick="confirmardeletar(${resposta[i].id})"><img src="../svg/delete-bin-5-line.svg" alt="Imagem de Lixeira">Excluir</button></li>
                            </ul>
                          </div>
					</div>
					<div class="row">
						<div class="col-0 titulo-fatos">
							<span>${resposta[i].titulofato}</span>
							<p>${datadofato}</p>
						</div>
					</div>

					<div class="row">
						<div class="col body-fatos">
							<span>${resposta[i].descricaofato}</span>
						</div>
					</div>
				</div>
			</div>`

				if(linha > 0)
				{
					local.innerHTML += `<div class="linha-vertical" style="border-color: #2F80ED"></div>`;
				}
				
				local.innerHTML += dadosfato;
				
			}
			linha += linha + 1;

			}
		}
	
	}
	catch (error) 
	{
		console.error("Erro ao recuperar os dados do cadastro:", error);
	}
}