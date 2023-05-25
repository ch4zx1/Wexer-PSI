document.getElementById('senha-id').addEventListener('submit', async function(e)
{
	e.preventDefault(); // prever duplo click
	const senha = document.getElementById('password').value;
	const confirmar = document.getElementById('confirm_password').value;

	var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

	if(senha.length >= 8)
	{
		if(!regex.exec(senha))
		{
			alert("Precisa conter um caractere especial e uma letra MAIÚSCULA");
		}
		else
		{
			if(senha === confirmar)
			{
				const nome = sessionStorage.getItem('nome')
				const email = sessionStorage.getItem('email')
				const concatenar = {"nome": nome, "email": email, "senha": senha}
				salvaUsuario(concatenar)
			}
			else
			{
				alert("As senhas não coincidem")
			}
		}
	}
	else
	{
		alert("Senha precisa ter 8 ou mais caracteres")
	}
}
)

async function salvaUsuario(user)
{
	try
	{
		await fetch('https://wexer-backend.onrender.com/usuarios', 
		{
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
		},
			body: JSON.stringify(user)
		})
		sessionStorage.clear();
		setTimeout(window.location.href = "../index.html", 2000);
	}
	catch(error)
	{
		alert("Erro ao cadastrar, tente novamente.")
	}
}