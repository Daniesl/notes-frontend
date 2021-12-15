const title = document.querySelector('#title');
const text = document.querySelector('#text');
const table = document.querySelector('#table');
const send = document.querySelector('#button');

const deleteCall = (id) => {
  fetch(`https://notes-dg-jt.herokuapp.com/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => load());
};

const load = async () => {
  table.innerHTML = '';
  title.value = '';
  text.value = '';
  table.innerHTML =
    '<tr><th>Title</th><th>Text</th><th>Delete</th><th>Created At</th></tr>';
  fetch('https://notes-dg-jt.herokuapp.com')
    .then((res) => res.json())
    .then((res) =>
      res.data.map((e) => {
        table.innerHTML += `<tr><td>${e.title}</td><td>${e.text
          }</td><td><button class="del button" id="${e._id
          }">Delete</button></td><td>${e.created_at.substring(0, 10)}</td></tr>`;
      })
    )
    .then((res) => {
      const del = document.querySelectorAll('.del');
      del.forEach((element) => {
        element.addEventListener('click', (e) => {
          deleteCall(element.id);
        });
      });
    });
};

load();

const post = () => {
  if (!title.value || !text.value) return;
  fetch('https://notes-dg-jt.herokuapp.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: title.value, text: text.value }),
  }).then(() => {
    load();
  });
};

send.addEventListener('click', post);
