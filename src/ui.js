class UI{
  constructor(){
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.posts = document.querySelector('#posts');
    this.formState = 'add';
  }

  //function to fill input fields with current post to be edited
  showForm(data){
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  //function to change the form state
  changeFormState(type){
    if(type === 'edit'){
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = `post-submit btn btn-danger btn-block`;

      //add cancel button
      const button = document.createElement('button');
      button.className = `post-cancel btn btn-secondary btn-block`;
      button.appendChild(document.createTextNode('Cancel Edit'));

      const parent = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');
      parent.insertBefore(button, formEnd);
    }else{
      //when NOT in EDIT State
      ui.clearFields();
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = `post-submit btn btn-primary btn-block`;
      
      //delete cancel button if exists
      const cancelBtn = document.querySelector('.post-cancel');
      if(cancelBtn){
        cancelBtn.remove();
      }

      //clear the id value in hidden field- this is how to recognize whether to submit or update
      this.idInput.value = '';
    }

  }

  //function to clear all alerts if it exists
  clearAlerts(){
    const currentAlert = document.querySelector('.alert');
    if(currentAlert){
      currentAlert.remove();
    }
  }

  //function to show alert messages
  showAlert(message, className){
    this.clearAlerts();
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));

    //get parent
    const parent = document.querySelector('.postsContainer');
    //get element to insert before
    const before = document.querySelector('#posts');

    parent.insertBefore(div, before);

    setTimeout(()=> {
      this.clearAlerts();
    }, 3000)
  }

  //function to clear the input fields
  clearFields(){
    this.titleInput.value = '';
    this.bodyInput.value = '';
    this.idInput.value = '';
  }

  //function to show all the posts in db.json file
  showPosts(posts){
    let html = '';

    posts.forEach(function(post){
      html += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i href="#" class="fa fa-edit"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i href="#" class="fa fa-times"></i>
            </a>
          </div>
        </div>
      `;
    })

    this.posts.innerHTML = html;
  }

}

export const ui = new UI();