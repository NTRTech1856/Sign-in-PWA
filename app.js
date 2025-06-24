{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 let signedInUsers = JSON.parse(localStorage.getItem('signedInUsers')) || [];\
\
function updateUI() \{\
  const list = document.getElementById('signedInList');\
  list.innerHTML = '';\
  signedInUsers.forEach(user => \{\
    const li = document.createElement('li');\
    li.className = "p-3 bg-gray-50 rounded shadow-sm";\
    li.textContent = `$\{user.name\} (Signed in at: $\{new Date(user.time).toLocaleTimeString()\})`;\
    list.appendChild(li);\
  \});\
  localStorage.setItem('signedInUsers', JSON.stringify(signedInUsers));\
\}\
\
function showSignInForm() \{\
  document.getElementById('formContainer').style.display = 'block';\
\}\
\
function hideForm() \{\
  document.getElementById('formContainer').style.display = 'none';\
  document.getElementById('nameInput').value = '';\
\}\
\
function signIn() \{\
  const name = document.getElementById('nameInput').value.trim();\
  if (name) \{\
    signedInUsers.push(\{ name: name, time: Date.now() \});\
    updateUI();\
    hideForm();\
  \}\
\}\
\
function showSignOutList() \{\
  const list = document.getElementById('signOutList');\
  list.innerHTML = '';\
  signedInUsers.forEach((user, index) => \{\
    const li = document.createElement('li');\
    li.className = "flex justify-between items-center bg-gray-50 p-2 rounded shadow-sm";\
    li.textContent = user.name;\
    const btn = document.createElement('button');\
    btn.textContent = 'Sign Out';\
    btn.className = "ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700";\
    btn.onclick = () => \{\
      signedInUsers.splice(index, 1);\
      updateUI();\
      showSignOutList();\
    \};\
    li.appendChild(btn);\
    list.appendChild(li);\
  \});\
  document.getElementById('signOutContainer').style.display = 'block';\
\}\
\
function hideSignOut() \{\
  document.getElementById('signOutContainer').style.display = 'none';\
\}\
\
updateUI();\
\
if ('serviceWorker' in navigator) \{\
  navigator.serviceWorker.register('sw.js')\
    .then(() => console.log('Service Worker registered.'));\
\}\
}