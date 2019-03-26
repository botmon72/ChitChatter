import { ui } from './ui';
import {http} from './easyhttp';
import { ETIME } from 'constants';

//loadEventListener function
const loadEventListeners = function(){
  //listen for DOM load and get posts
  document.addEventListener('DOMContentLoaded', getPosts);

  //listen for post button
  document.querySelector('.post-submit').addEventListener('click', postSubmit);

  //listen for delete button
  document.querySelector('#posts').addEventListener('click', deletePost);

  //listen for edit button to change form state
  document.querySelector('#posts').addEventListener('click', enableEdit);

  //listen for cancel button to change form state back
  document.querySelector('.card-form').addEventListener('click', cancelEdit);
}


//function to change back the form when edit is cancelled
function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }
}


//enable edit function
function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    //fill input fields with current post
    ui.showForm(data);
  }

  e.preventDefault();
}

//delete post function
function deletePost(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert(`Post deleted`, `alert alert-success`);
        getPosts();
      })
      .catch(err => console.log(err));
    }
  }

  e.preventDefault();
}

//submit post/ update post function
function postSubmit(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  if(title !== '' || body !== ''){
    if(id !== ''){
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated', `alert alert-success`);
          ui.changeFormState('add');
          getPosts();
        })
        .catch(error => console.log(error))
    }else{
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.clearFields();
        ui.showAlert(`Post has been added`, `alert alert-success`);
        getPosts();
      })
      .catch(error => console.log(error));
    }
  }else{
    ui.showAlert(`Please fill in all fields`, `alert alert-danger`);
  }
}

//get posts function
function getPosts(){
  http.get('http://localhost:3000/posts')
    .then(data => {
      ui.showPosts(data);
    })
    .catch(error => console.log(error));
}




loadEventListeners();
