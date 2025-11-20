// client-side inventory CRUD demo using localStorage
const form = document.getElementById('itemForm');
const itemsNode = document.getElementById('items');
const KEY='demo_inventory_v1';

function load(){
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}
function save(arr){ localStorage.setItem(KEY, JSON.stringify(arr)); }
function render(){
  const arr = load();
  itemsNode.innerHTML='';
  if(arr.length===0) itemsNode.innerHTML='<li class="muted">No items yet</li>';
  arr.forEach((it, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${it.name} — ${it.qty}</span>
      <span>
        <button data-action="edit" data-i="${idx}">Edit</button>
        <button data-action="del" data-i="${idx}">Delete</button>
      </span>`;
    itemsNode.appendChild(li);
  });
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const qty = Number(document.getElementById('qty').value) || 0;
  if(!name) return alert('Provide item name.');
  const arr = load();
  // if exists update, else push
  const idx = arr.findIndex(x => x.name.toLowerCase() === name.toLowerCase());
  if(idx >= 0) arr[idx].qty = qty;
  else arr.push({name, qty});
  save(arr); render();
  form.reset();
});
itemsNode.addEventListener('click', e => {
  const action = e.target.dataset.action;
  const i = e.target.dataset.i;
  if(!action) return;
  let arr = load();
  if(action === 'del') { arr.splice(i,1); save(arr); render(); }
  if(action === 'edit') {
    const it = arr[i];
    document.getElementById('name').value = it.name;
    document.getElementById('qty').value = it.qty;
  }
});

render();
