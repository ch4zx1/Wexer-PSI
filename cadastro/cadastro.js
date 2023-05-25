document.getElementById('cadastro-id').addEventListener('submit', async function(e)
{
	e.preventDefault(); // prever duplo click

	//entrada do usuario
	const nome = document.getElementById('nome').value;
	const email = document.getElementById('email').value;

	if (nome != 0)
	{
		if (email != 0)
		{
			if(email.length > 5)
			{
				const apiresponse = await fetch('https://wexer-backend.onrender.com/usuarios?email=' + email);
				const response = await apiresponse.json();

				try
				{
					const verifyemail = response[0].email;

					if(verifyemail === email)
					{
						alert("Email já cadastrado")
					}
				}
				catch(error)
				{
					sessionStorage.setItem("nome", nome);
					sessionStorage.setItem("email", email);
					window.location.href = "./senha.html";
				}
				
			}
			else
			{
				alert("Email Invalido")
			}
			
		}
		else
			alert("Email não pode ficar em branco")
	}
	else
		alert("Nome não pode ficar em branco")

}
)