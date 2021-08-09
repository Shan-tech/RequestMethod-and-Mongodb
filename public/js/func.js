// home post request
function add(){
console.log("tiggered! add")
n=document.getElementById('name').value;
a=document.getElementById('age').value;
var obj={"name":n,"age":a};
  fetch('/voter',{
    headers:{
    'Accept':"application/json",
    'Content-type':"application/json"},
    method:'post',
    body:JSON.stringify(obj)
  })
   .then((res)=>res.json())
  .then((data)=>{
    var msg=document.getElementById("msg");
    msg.style.display="block";
    console.log(data);
    msg.innerHTML=`<p>${JSON.stringify(data.info)}<br>${JSON.stringify(data.result)}</p>`;
});
}

// viewdata get request
function get(){
    console.log("tiggered! get")
    id=document.getElementById('id').value;
  fetch('/voter/get/'+id,{method:"GET"})
   .then((res)=>res.json())
  .then((data)=>{
    var msg=document.getElementById("msg");
    msg.style.display="block";
    console.log(JSON.stringify(data.result));
    msg.innerHTML=`<p>${JSON.stringify(data.info)}<br>${JSON.stringify(data.result)}</p>`;
});
}

function del(){
    console.log("tiggered! del")
    id=document.getElementById('id').value;
    var obj={"id":id};
    fetch('/voter/del',{headers:{
      'Accept':"application/json",
      'Content-type':"application/json"},
      method:'delete',
      body:JSON.stringify(obj)})
    .then((res)=>res.json())
    .then((data)=>{
      var msg=document.getElementById("msg");
      msg.style.display="block";
      console.log(JSON.stringify(data.result));
      msg.innerHTML=`<p>${JSON.stringify(data.info)}<br>${JSON.stringify(data.data)}</p>`;
    });
}

function update(){
    console.log("tiggered! update");
    id=document.getElementById('id').value;
    n=document.getElementById('name').value;
    a=document.getElementById('age').value;
    var obj={"id":id,'name':n,'age':a};
    fetch('/voter/update',{headers:{
      'Accept':"application/json",
      'Content-type':"application/json"},
      method:'put',
      body:JSON.stringify(obj)})
    .then((res)=>res.json())
    .then((data)=>{
      var msg=document.getElementById("msg");
      msg.style.display="block";
      console.log(JSON.stringify(data.result));
      msg.innerHTML=`<p>${JSON.stringify(data.info)}<br>${JSON.stringify(data.result)}</p>`;
    });
}