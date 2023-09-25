// let page;

// document.addEventListener('DOMContentLoaded', function () {
//   page = new Page(window);
// });

// class Page {
//   constructor() {
//     this.attachEvents();
//     this.loadDataUser();
//   }

//   get(id) {
//     return document.querySelector(id);
//   }

//   attachEvents() {
//     let btnLogout = this.get('#btnLogout');
//     btnLogout.addEventListener('click', this.logout);
//   }

//   loadDataUser() {
//     let profileUser = this.get('#profileUser');
//     let profileUserBox = this.get('#profileUserBox');
//     let profileName = this.get('#profileName');
//     let profileEmail = this.get('#profileEmail');

//     window.ipcRender.invoke('getUserData').then((result) => {
//       const { user, email, permissions, image, name } = result;

//       if (permissions == 'admin') {
//         profileName.innerHTML = name;
//         profileEmail.innerHTML = email;
//         profileUser.src = '../assets/images/' + image;
//         profileUserBox.src = '../assets/images/' + image;

//         window.ipcRender.send('consultCarreras');
//       } else if (permissions == 'invitado') {
//         profileName.innerHTML = 'Lector';
//         profileEmail.innerHTML = '';
//       }
//     });
//   }

//   logout() {
//     window.ipcRender.send('logout', 'confirm-logout');
//   }
// }

class Page {
  constructor() {
    this.attachEvents();
    this.loadDataUser();
  }

  get(id) {
    return document.querySelector(id);
  }

  attachEvents() {
    let btnLogout = this.get('#btnLogout');
    btnLogout.addEventListener('click', this.logout);
  }

  loadDataUser() {
    let profileUser = this.get('#profileUser');
    let profileUserBox = this.get('#profileUserBox');
    let profileName = this.get('#profileName');
    let profileEmail = this.get('#profileEmail');

    // Verificar si los elementos existen antes de acceder a ellos
    if (profileName && profileEmail && profileUser && profileUserBox) {
      window.ipcRender.invoke('getUserData').then((result) => {
        const { user, email, permissions, image, name } = result;

        if (permissions === 'admin') {
          profileName.innerHTML = name;
          profileEmail.innerHTML = email;
          profileUser.src = '../assets/images/' + image;
          profileUserBox.src = '../assets/images/' + image;

          window.ipcRender.send('consultCarreras');
        } else if (permissions === 'invitado') {
          profileName.innerHTML = 'Lector';
          profileEmail.innerHTML = '';
        }
      });
    } else {
      console.error('Los elementos no existen en el DOM');
    }
  }

  logout() {
    window.ipcRender.send('logout', 'confirm-logout');
  }
}
