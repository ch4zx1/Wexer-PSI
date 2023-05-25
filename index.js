document.getElementById('entrar-id').addEventListener('submit', async function(e)
{
	e.preventDefault(); // prever duplo click

	//entrada do usuario
	const email = document.getElementById('login').value;
	const password = document.getElementById('password').value;

	if(!email)
	{
		document.getElementById('botao-entrar').textContent = 'Digite o Login';
		setTimeout(showentrar, 1600);
	}
	else
	{
		const apiresponse = await fetch('https://wexer-backend.onrender.com/usuarios?email=' + email);
		const response = await apiresponse.json();
	
		try 
		{
			const catid = response[0].id;
			const verifyemail = response[0].email;
			const verifypassword = response[0].senha;

			if (email === verifyemail)
			{
				if(password === verifypassword)
				{
					sessionStorage.setItem("userid", catid);
					window.location.href = "./dashboard/index.html";
				}
				else
				{
					document.getElementById('botao-entrar').textContent = 'Senha incorreta';
					setTimeout(showentrar, 2000);
				}
			}
			else
			{
				document.getElementById('botao-entrar').textContent = 'Erro ao verificar email';
				setTimeout(showentrar, 2000);
			}
		} 
		catch(error) 
		{
			document.getElementById('botao-entrar').textContent = 'Email não cadastrado';
			setTimeout(showentrar, 2000);
		}

	}

	function showentrar() 
	{
		document.getElementById('botao-entrar').textContent = 'Entrar';
	}
}
)