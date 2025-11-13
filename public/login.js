// login.js - versão com debug e fallback
(function(){
    const btn = document.getElementById('btnEntrar');
    const msgEl = document.getElementById('msg');
  
    function showMsg(text){
      msgEl.style.display = 'block';
      msgEl.textContent = text;
    }
  
    function clearMsg(){
      msgEl.style.display = 'none';
      msgEl.textContent = '';
    }
  
    async function logar() {
      clearMsg();
  
      const email = document.getElementById('emailLogin').value.trim();
      const senha = document.getElementById('senhaLogin').value;
  
      if (!email || !senha) {
        showMsg('Preencha email e senha.');
        return;
      }
  
      const baseUrl = 'pessoas';
      // primeiro tentamos busca exata via query param (json-server suporta ?email=)
      const exactUrl = `${baseUrl}?email=${encodeURIComponent(email)}`;
  
      console.log('[login] tentando buscar usuário por email (exato):', exactUrl);
  
      try {
        const resp = await fetch(exactUrl, { cache: 'no-store' });
  
        if (!resp.ok) {
          console.error('[login] resposta não OK:', resp.status, resp.statusText);
          showMsg('Erro ao conectar com o backend (status ' + resp.status + '). Veja o console.');
          return;
        }
  
        const data = await resp.json();
        console.log('[login] resultado busca exata:', data);
  
        let usuario = null;
  
        if (Array.isArray(data) && data.length > 0) {
          usuario = data[0];
        } else {
          // Fallback: pega todos e filtra localmente (case-insensitive, trim)
          console.warn('[login] busca exata não retornou, tentando fallback (fetch all + filtro local)');
          const allResp = await fetch(baseUrl, { cache: 'no-store' });
          if (!allResp.ok) {
            console.error('[login] erro ao buscar todos:', allResp.status);
            showMsg('Erro ao conectar com o backend ao tentar fallback.');
            return;
          }
          const all = await allResp.json();
          console.log('[login] total usuários obtidos no fallback:', all.length);
          const lowerEmail = email.toLowerCase();
          usuario = all.find(u => (u.email || '').toLowerCase().trim() === lowerEmail) || null;
        }
  
        if (!usuario) {
          showMsg('Usuário não encontrado. Cadastre-se.');
          return;
        }
  
        // verifica senha
        if (usuario.senha === senha) {
          console.log('[login] autenticação OK para usuário id=', usuario.id);
          // salva sessão simples (opcional)
          try { localStorage.setItem('sess_usuario', JSON.stringify({ id: usuario.id, nome: usuario.nome, admin: !!usuario.admin })); } catch(e){/* ignore */ }
  
          if (usuario.admin) {
            window.location.href = 'admin.html';
          } else {
            window.location.href = 'boasvindas.html';
          }
        } else {
          console.warn('[login] senha incorreta para usuário id=', usuario.id);
          showMsg('Senha incorreta.');
        }
  
      } catch (err) {
        console.error('[login] erro fetch:', err);
        showMsg('Erro de rede ou CORS. Veja o console do navegador.');
      }
    }
  
    btn.addEventListener('click', logar);
  })();

  
