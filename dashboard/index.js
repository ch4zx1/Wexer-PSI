const userid = sessionStorage.getItem('userid');

async function checkuser()
{
	if(!userid)
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

document.getElementById('criarpaciente').addEventListener('click', async function(e)
{
	e.preventDefault(); // prever duplo click
	
	const cpf = document.getElementById('cpfid').value;
	const nome = document.getElementById('nomeid').value;
	const nascimento = document.getElementById('nascimentoid').value;
	const email = document.getElementById('emailid').value;
	const genero = document.getElementById('generoid').value;
	const nacionalidade = document.getElementById('nacionalidadeid').value;
	const naturalidade = document.getElementById('naturalidadeid').value;
	const profissao = document.getElementById('profissaoid').value;
	const escolaridade = document.getElementById('escolaridadeid').value;
	const relacionamento = document.getElementById('relacionamentoid').value;
	const mae = document.getElementById('maeid').value;
	const pai = document.getElementById('paiid').value;

	if(!nome)
	{
		alert("Nome precisa ser preenchido")
	}
	else
	{
		novocadastro = {
		
			psicologoid: userid,
			cpf: cpf,
			nome: nome,
			nascimento: nascimento,
			email: email,
			genero: genero,
			nacionalidade: nacionalidade,
			naturalidade: naturalidade,
			profissao: profissao,
			escolaridade: escolaridade,
			relacionamento: relacionamento,
			mae: mae,
			pai: pai,
			
		}
		salvarcadastro(novocadastro)
	}
	
}
)

async function salvarcadastro(cadastro)
{
	try
	{
		await fetch('https://wexer-backend.onrender.com/pacientes', 
		{
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(cadastro)
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

async function editardados(id)
{
	try
	{
		const requisicao =  await fetch('https://wexer-backend.onrender.com/pacientes?id=' + id); 
		const resposta = await requisicao.json();
		const paciente = resposta[0];

		const editardados = new bootstrap.Modal('#abrireditar');
		const dadosid = document.getElementById('abrireditar'); 
		editardados.show(dadosid);

		addbotaosalvar(id);

		document.getElementById('cpfeditar').value = paciente.cpf;
		document.getElementById('nomeeditar').value = paciente.nome;
		document.getElementById('nascimentoeditar').value = paciente.nascimento;
		document.getElementById('emaileditar').value = paciente.email;
		document.getElementById('generoeditar').value = paciente.genero;
		document.getElementById('nacionalidadeeditar').value = paciente.nacionalidade;
		document.getElementById('naturalidadeeditar').value = paciente.naturalidade;
		document.getElementById('profissaoeditar').value = paciente.profissao;
		document.getElementById('escolariedadeeditar').value = paciente.escolaridade;
		document.getElementById('relacionamentoeditar').value = paciente.relacionamento;
		document.getElementById('maeeditar').value = paciente.mae;
		document.getElementById('paieditar').value = paciente.pai;
	}
	catch(error)
	{
		alert("Erro ao obter dados da API");
	}
	
}

async function salvareditar(id)
{
	const cpf = document.getElementById('cpfeditar').value;
	const nome = document.getElementById('nomeeditar').value;
	const nascimento = document.getElementById('nascimentoeditar').value;
	const email = document.getElementById('emaileditar').value;
	const genero = document.getElementById('generoeditar').value;
	const nacionalidade = document.getElementById('nacionalidadeeditar').value;
	const naturalidade = document.getElementById('naturalidadeeditar').value;
	const profissao = document.getElementById('profissaoeditar').value;
	const escolaridade = document.getElementById('escolariedadeeditar').value;
	const relacionamento = document.getElementById('relacionamentoeditar').value;
	const mae = document.getElementById('maeeditar').value;
	const pai = document.getElementById('paieditar').value;

	cadastroatualizado = {
		
		psicologoid: userid,
		cpf: cpf,
		nome: nome,
        nascimento: nascimento,
        email: email,
        genero: genero,
        nacionalidade: nacionalidade,
        naturalidade: naturalidade,
        profissao: profissao,
        escolaridade: escolaridade,
        relacionamento: relacionamento,
        mae: mae,
        pai: pai
	}
	atualizarcadastro(cadastroatualizado, id);
}

async function atualizarcadastro(cadastro, id)
{
	await fetch('https://wexer-backend.onrender.com/pacientes/' + id,
	{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cadastro)
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
				document.getElementById('sucesstext').textContent = "Paciente atualizado com sucesso!";
			}
		});
}

async function abrirdados(id)
{
	try
	{
		const requisicao =  await fetch('https://wexer-backend.onrender.com/pacientes?id=' + id); 
		const resposta = await requisicao.json();
		const paciente = resposta[0];

		document.getElementById('cpfdados').value = paciente.cpf;
		document.getElementById('nomedados').value = paciente.nome;
		document.getElementById('nascimentodados').value = paciente.nascimento;
		document.getElementById('emaildados').value = paciente.email;
		document.getElementById('generodados').value = paciente.genero;
		document.getElementById('nacionalidadedados').value = paciente.nacionalidade;
		document.getElementById('naturalidadedados').value = paciente.naturalidade;
		document.getElementById('profissaodados').value = paciente.profissao;
		document.getElementById('escolariedadedados').value = paciente.escolaridade;
		document.getElementById('relacionamentodados').value = paciente.relacionamento;
		document.getElementById('maedados').value = paciente.mae;
		document.getElementById('paidados').value = paciente.pai;

		const abrirdados = new bootstrap.Modal('#abrirdados');
		const dadosid = document.getElementById('abrirdados'); 
		abrirdados.show(dadosid);
	}
	catch(error)
	{
		alert("Erro ao obter dados da API");
	}
	
}

async function confirmardeletar(pid)
{
	try
	{
		const response = await fetch('https://wexer-backend.onrender.com/pacientes/'+ pid);
		const pacientes = await response.json();

		const confirmmodal = new bootstrap.Modal('#abrirconfirmar');
		const confirmarid = document.getElementById('abrirconfirmar'); 
		confirmmodal.show(confirmarid);

		const botao = document.getElementById("confirmar-botoes");

		const injetar = 
		`<button type="button" id="confirm-apagar" class="btn btn-success modal-btn-confirmarsim"  onclick="deletarcadastro(${pacientes.id})" data-bs-dismiss="modal">Sim</button>
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

async function deletarcadastro(id)
{
	try
	{
		await fetch('https://wexer-backend.onrender.com/pacientes/' + id, 
		{
        	method: "DELETE"
      	})
		.then(response => 
			{
				if(!response.ok)
				{
					alert("Falha ao apagar usuário, tente novamente.")
				}
				else
				{
					const sucessmodal = new bootstrap.Modal('#abrirsucess');
					const sucessid = document.getElementById('abrirsucess'); 
					sucessmodal.show(sucessid);
					document.getElementById('sucesstext').textContent = "Paciente deletado com sucesso!";
				}
			});
	}
	catch(error)
	{
		alert("Erro ao conectar a API")
	}
}

async function tabela(psicologoid)
{
	try
	{
		const response = await fetch('https://wexer-backend.onrender.com/pacientes?psicologoid=' + psicologoid);
		const pacientes = await response.json();

		const tabela = document.getElementById("tablebody");
		for(let i = 0; i < pacientes.length; i++)
		{
			const injetar = 
			`<tr>
			<td class="id-table texto-tabela534">${pacientes[i].id}</td>
			<td>
				<button type="button" class="nomebotao texto-tabela534" onclick="abrirdados(${pacientes[i].id})">${pacientes[i].nome}</button>
			</td>
			<td class="texto-tabela534">${pacientes[i].cpf}</td>
			<td class="acao-table">
				<button type="button" class="botao-acao ver-acao" onclick="prontuario(${pacientes[i].id})"><img src="../svg/todo-fill.svg" alt=""></button>
				<button type="button" class="botao-acao editar-acao"
				onclick="editardados(${pacientes[i].id})"><img src="../svg/edit-2-line.svg" alt=""></button>
				<button type="button" class="botao-acao apagar-acao" onclick="confirmardeletar(${pacientes[i].id})"><img src="../svg/trash-2.svg" alt=""></button>
			</td>
		</tr>`

		tabela.innerHTML += injetar
		}
	}
	catch(error)
	{
		alert("Falha ao obter dados");
	}
}

async function addbotaosalvar(id)
{
	try
	{
		const response = await fetch('https://wexer-backend.onrender.com/pacientes/'+ id);
		const pacientes = await response.json();

		const botao = document.getElementById("botaoinject");

		const injetar = 
		`<button type="button" class="btn botao-cancelar" data-bs-dismiss="modal">Cancelar</button>
		<button type="button" class="btn btn-primary btn-modal-salvar" data-bs-dismiss="modal" onclick="salvareditar(${pacientes.id})">Salvar alterações</button>`

		botao.innerHTML += injetar

		document.getElementById('abrireditar').addEventListener('hide.bs.modal', async event => 
		{
			botao.innerHTML -= injetar
			botao.innerText = ""
		})
	}
	catch(error)
	{
		alert("Erro ao obter ID")
	}
	
}

function prontuario(id)
{
	sessionStorage.setItem("iddopaciente", id);
	window.location.href = "../prontuario/index.html";
}

document.getElementById('cpfid').addEventListener('input', function (event)
{
	let cpf = event.target.value;
	cpf = cpf.replace(/\D/g, '');
  
	if (cpf.length > 3) {
	  cpf = cpf.replace(/^(\d{3})/, '$1.');
	}
  
	if (cpf.length > 6) {
	  cpf = cpf.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
	}
  
	if (cpf.length > 9) {
	  cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
	}
  
	event.target.value = cpf;
});

document.getElementById('cpfeditar').addEventListener('input', function (event)
{
	let cpf = event.target.value;
	cpf = cpf.replace(/\D/g, '');
  
	if (cpf.length > 3) 
	{
	  cpf = cpf.replace(/^(\d{3})/, '$1.');
	}
  
	if (cpf.length > 6) 
	{
	  cpf = cpf.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
	}
  
	if (cpf.length > 9) 
	{
	  cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
	}
  
	event.target.value = cpf;
});

async function pesquisa()
{
	try 
	{
		entradapesquisa = document.getElementById("pesquisar-dashboard").value
		const response = await fetch("https://wexer-backend.onrender.com/pacientes?q=" + entradapesquisa);
		const pacientes = await response.json();

		if(entradapesquisa === '')
		{
			location.reload();
		}
		const tabela = document.getElementById("tablebody");

		const zero = ''
		tabela.innerHTML = zero

		for(let i = 0; i < pacientes.length; i++)
		{
			if(pacientes[i].psicologoid === userid)
			{
				const injetar = 
				`<tr>
				<td class="id-table texto-tabela534">${pacientes[i].id}</td>
				<td>
					<button type="button" class="nomebotao texto-tabela534" onclick="abrirdados(${pacientes[i].id})">${pacientes[i].nome}</button>
				</td>
				<td class="texto-tabela534">${pacientes[i].cpf}</td>
				<td class="acao-table">
					<button type="button" class="botao-acao ver-acao" onclick="prontuario(${pacientes[i].id})"><img src="../svg/todo-fill.svg" alt=""></button>
					<button type="button" class="botao-acao editar-acao"
					onclick="editardados(${pacientes[i].id})"><img src="../svg/edit-2-line.svg" alt=""></button>
					<button type="button" class="botao-acao apagar-acao" onclick="confirmardeletar(${pacientes[i].id})"><img src="../svg/trash-2.svg" alt=""></button>
				</td>
				</tr>`

				tabela.innerHTML += injetar
			}
		}
	
	}
	catch (error) 
	{
		console.error("Erro ao recuperar os dados do cadastro:", error);
	}
}