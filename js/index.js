var changePhotoBtn = document.getElementById("changePhotoBtn");
var fileInput = document.getElementById("fileInput");
var boxst = document.querySelector(".box");
var closebtn = document.querySelector(".btn-close");
var btnmain = document.querySelector(".btn-add-contact");

var namecard = document.getElementById("name");
var phonecard = document.getElementById("phone");
var emailcard = document.getElementById("email");
var addresscard = document.getElementById("address");
var groupcard = document.getElementById("group");
var Notescard = document.getElementById("Notes");
var favCheckcard = document.getElementById("favCheck");
var emergCheckcard = document.getElementById("emergCheck");

var btnmodalcancel = document.querySelector(".btn-modal-cancel");
var btnmodalsave = document.querySelector(".btn-modal-save");
var rowdata = document.getElementById("rowdata");
var divnone = document.getElementById("divnone");

var avatarColors = {
  color1: "#2A9D8F",
  color2: "#E76F51",
  color3: "#F4A261",
  color4: "#457B9D",
  color5: "#1D3557",
  color6: "#6A4C93",
  color7: "#8338EC",
  color8: "#3A86FF",
};

var avatarColor = {
  color1: "#2a9d9037",
  color2: "#e76f512d",
  color3: "#f4a36132",
  color4: "#457b9d3a",
  color5: "#1d35571a",
  color6: "#694c9344",
  color7: "#8338ec48",
  color8: "#3a85ff42",
};

var move;
var productcard = [];

function getRandomColorKey() {
  var keys = Object.keys(avatarColors);
  var randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

function getInitials(fullName) {
  if (!fullName) return "CT";
  var names = fullName.trim().split(" ");
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase();
  }
  return fullName.slice(0, 2).toUpperCase();
}

if (localStorage.getItem("card") !== null) {
  productcard = JSON.parse(localStorage.getItem("card"));

  var hasUpdates = false;
  for (var i = 0; i < productcard.length; i++) {
    if (!productcard[i].colorKey) {
      var foundKey = Object.keys(avatarColors).find(function (key) {
        return avatarColors[key] === productcard[i].bgColor;
      });
      productcard[i].colorKey = foundKey || getRandomColorKey();
      hasUpdates = true;
    }
  }
  if (hasUpdates) {
    localStorage.setItem("card", JSON.stringify(productcard));
  }
}

display();

btnmain.addEventListener("click", function () {
  clearForm();
  move = undefined;
  boxst.classList.remove("d-none");
});

closebtn.addEventListener("click", function () {
  boxst.classList.add("d-none");
});

btnmodalcancel.addEventListener("click", function () {
  boxst.classList.add("d-none");
});

changePhotoBtn.addEventListener("click", function () {
  fileInput.click();
});

favCheckcard.addEventListener("change", function () {
  if (this.checked) {
    emergCheckcard.checked = false;
  }
});

emergCheckcard.addEventListener("change", function () {
  if (this.checked) {
    favCheckcard.checked = false;
  }
});



function display(searchTerm = "") {
  var box = "";
  var favBox = "";
  var emergBox = "";
  var term = searchTerm.toLowerCase();

  for (var i = 0; i < productcard.length; i++) {
    var contact = productcard[i];
    var initials = getInitials(contact.name);
    var key = contact.colorKey || getRandomColorKey();
    var cardBgColor = avatarColors[key];
    var badgeBgColor = avatarColor[key];

    if (
      term === "" ||
      contact.name.toLowerCase().includes(term) ||
      contact.phone.includes(term) ||
      contact.email.toLowerCase().includes(term)
    ) {
      var emergClass = contact.emergCheck ? "" : "d-none";
      var favBadgeClass = contact.favCheck ? "" : "d-none";
      var emergBtnActive = contact.emergCheck ? "active" : "";
      var favBtnActive = contact.favCheck ? "starst" : "";
      var favrr = contact.favCheck ? "solid" : "regular";
       var favrr1 = contact.emergCheck ? "heart-pulse" : "heart";
        var favrr2 = contact.emergCheck ? "solid" : "regular";

      box += ` <div class="col-12 col-md-6">
                <div class="contact-card">
                    <div class="card-body-content">
                        <div class="d-flex align-items-start gap-3 mb-3">
                            <div class="position-relative">
                               <div class="contact-avatar-box" style="background-color: ${cardBgColor}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                                 ${initials}
                               </div>
                                <span class="${emergClass} avatar-badge-emergency"><i class="fa-solid fa-heart-pulse"></i></span>
                                <span class="${favBadgeClass} avatar-badge-fav"><i class="fa-solid fa-star"></i></span>
                            </div>
                            <div>
                                <h5 class="contact-name mb-2">${contact.name}</h5>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="info-icon-box phone-box"><i class="fa-solid fa-phone"></i></span>
                                    <span class="contact-text">${contact.phone}</span>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex align-items-center gap-3 mb-3">
                            <span class="info-icon-box email-box"><i class="fa-solid fa-envelope"></i></span>
                            <span class="contact-text">${contact.email}</span>
                        </div>

                        <div class="d-flex align-items-center gap-3 mb-4">
                            <span class="info-icon-box address-box"><i class="fa-solid fa-location-dot"></i></span>
                            <span class="contact-text">${contact.address}</span>
                        </div>

                        <div class="d-flex gap-2 mb-2">
                            <span class="badge-custom badge-other" style="background-color: ${badgeBgColor}; color: ${cardBgColor};">${contact.group}</span>
                            <span class="badge-custom ${emergClass} badge-emergency">
                                <i class="fa-solid fa-heart-pulse" style="color: rgb(255, 30, 30);"></i> Emergency
                            </span>
                        </div>
                    </div>

                    <div class="card-footer-actions d-flex align-items-center justify-content-between">
                        <div class="d-flex gap-2">
                           <button class="action-btn btn-call" onclick="window.location.href='tel:${contact.phone}'">
        <i class="fa-solid fa-phone"></i>
    </button>
    <button class="action-btn btn-msg" onclick="window.location.href='mailto:${contact.email}'">
        <i class="fa-solid fa-envelope"></i>
    </button>
                        </div>
                        <div class="d-flex align-items-center gap-1">
                           <button class="action-btn-icon btn-fav-toggle ${favBtnActive}" onclick="toggleFavorite(${i})">
    <i class="fa-${favrr} fa-star"></i>
</button>
<button class="action-btn-icon btn-emerg-toggle ${emergBtnActive}" onclick="toggleEmergency(${i})">
    <i class="fa-${favrr2} fa-${favrr1} "></i>
</button>
                            <button class="action-btn-icon btn-edit" onclick="update(${i})"><i class="fa-solid fa-pen"></i></button>
                            <button class="action-btn-icon btn-delete" onclick="delet(${i})"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    if (contact.favCheck) {
      favBox += `
            <div class="contact-card1 mb-2">
                <div class="avatar-box1" style="background-color: ${cardBgColor}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; width: 40px; height: 40px; border-radius: 50%;">
                    ${initials}
                </div>
                <div class="contact-details1 ms-3" style="flex-grow: 1;">
                    <h5 class="contact-name1 mb-0" style="font-size: 0.9rem; font-weight: 600;">${contact.name}</h5>
                    <span class="contact-phone1 text-muted" style="font-size: 0.8rem;">${contact.phone}</span>
                </div>
                <button onclick="window.location.href='tel:${contact.phone}'" class="call-btn1 btn btn-sm btn-light" style="border-radius: 50%;"><i class="fa-solid fa-phone text-success" ></i></button>
            </div>`;
    }

    if (contact.emergCheck) {
      emergBox += `
            <div class="contact-card2 mb-2">
                <div class="avatar-box1" style="background-color: ${cardBgColor}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; width: 40px; height: 40px; border-radius: 50%;">
                    ${initials}
                </div>
                <div class="contact-details1 ms-3" style="flex-grow: 1;">
                    <h5 class="contact-name1 mb-0" style="font-size: 0.9rem; font-weight: 600;">${contact.name}</h5>
                    <span class="contact-phone1 text-muted" style="font-size: 0.8rem;">${contact.phone}</span>
                </div>
                <button onclick="window.location.href='tel:${contact.phone}'" class="call-btn2 btn btn-sm btn-light" style="border-radius: 50%;"><i class="fa-solid fa-phone text-danger" ></i></button>
            </div>`;
    }
  }

  rowdata.innerHTML = box;

  if (box === "") {
    divnone.classList.remove("d-none");
  } else {
    divnone.classList.add("d-none");
  }

  var favListDiv = document.getElementById("favList");
  var emergListDiv = document.getElementById("emergList");

  if (favListDiv) {
    favListDiv.innerHTML = favBox !== "" ? favBox : "No favorites yet";
  }
  if (emergListDiv) {
    emergListDiv.innerHTML =
      emergBox !== "" ? emergBox : "No emergency contacts";
  }

  updateStats();
}

function clearForm() {
  namecard.value = "";
  phonecard.value = "";
  emailcard.value = "";
  addresscard.value = "";
  groupcard.value = "Other";
  Notescard.value = "";
  favCheckcard.checked = false;
  emergCheckcard.checked = false;
}
function validateName() {
    var nameValue = namecard.value.trim();
    var nameParts = nameValue.split(/\s+/);
    if (nameParts.length < 2 || nameParts[0] === "" || nameParts[1] === "") {
        namecard.classList.add('is-invalid-input');
        document.getElementById('nameError').classList.remove('d-none');
        return false;
    } else {
        namecard.classList.remove('is-invalid-input');
        document.getElementById('nameError').classList.add('d-none');
        return true;
    }
}

function validatePhone() {
    var phoneValue = phonecard.value.trim();
    var egyptPhoneRegex = /^01[0125][0-9]{8}$/;
    if (!egyptPhoneRegex.test(phoneValue)) {
        phonecard.classList.add('is-invalid-input');
        document.getElementById('phoneError').classList.remove('d-none');
        return false;
    } else {
        phonecard.classList.remove('is-invalid-input');
        document.getElementById('phoneError').classList.add('d-none');
        return true;
    }
}

function validateEmail() {
    var emailValue = emailcard.value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue !== "" && !emailRegex.test(emailValue)) {
        emailcard.classList.add('is-invalid-input');
        document.getElementById('emailError').classList.remove('d-none');
        return false;
    } else {
        emailcard.classList.remove('is-invalid-input');
        document.getElementById('emailError').classList.add('d-none');
        return true;
    }
}

function validateAddress() {
    var addressValue = addresscard.value.trim();
    if (addressValue !== "" && addressValue.length < 5) {
        addresscard.classList.add('is-invalid-input');
        document.getElementById('addressError').classList.remove('d-none');
        return false;
    } else {
        addresscard.classList.remove('is-invalid-input');
        document.getElementById('addressError').classList.add('d-none');
        return true;
    }
}

function validateGroup() {
    var groupValue = groupcard.value;
    if (!groupValue || groupcard.selectedIndex === 0 || groupValue === "Select a group") {
        groupcard.classList.add('is-invalid-input');
        document.getElementById('groupError').classList.remove('d-none');
        return false;
    } else {
        groupcard.classList.remove('is-invalid-input');
        document.getElementById('groupError').classList.add('d-none');
        return true;
    }
}

function validateNotes() {
    var notesValue = Notescard.value.trim();
    if (notesValue !== "" && notesValue.length > 200) {
        Notescard.classList.add('is-invalid-input');
        document.getElementById('notesError').classList.remove('d-none');
        return false;
    } else {
        Notescard.classList.remove('is-invalid-input');
        document.getElementById('notesError').classList.add('d-none');
        return true;
    }
}

namecard.addEventListener('input', validateName);
phonecard.addEventListener('input', validatePhone);
emailcard.addEventListener('input', validateEmail);
addresscard.addEventListener('input', validateAddress);
groupcard.addEventListener('change', validateGroup);
Notescard.addEventListener('input', validateNotes);

btnmodalsave.addEventListener('click', function (e) {
    e.preventDefault();

    var isNameValid = validateName();
    var isPhoneValid = validatePhone();
    var isEmailValid = validateEmail();
    var isAddressValid = validateAddress();
    var isGroupValid = validateGroup();
    var isNotesValid = validateNotes();

   
    if (!isNameValid || !isPhoneValid || !isEmailValid || !isAddressValid || !isGroupValid || !isNotesValid) {
        var errorFields = [];

        if (!isNameValid) errorFields.push("<li><b>الاسم الكامل:</b> يجب إدخال اسمين على الأقل.</li>");
        if (!isPhoneValid) errorFields.push("<li><b>رقم الهاتف:</b> يجب إدخال رقم مصري صحيح (11 رقم).</li>");
        if (!isEmailValid) errorFields.push("<li><b>البريد الإلكتروني:</b> صيغة البريد غير صحيحة.</li>");
        if (!isAddressValid) errorFields.push("<li><b>العنوان:</b> يجب ألا يقل عن 5 أحرف.</li>");
        if (!isGroupValid) errorFields.push("<li><b>المجموعة:</b> يجب اختيار مجموعة صالحة.</li>");
        if (!isNotesValid) errorFields.push("<li><b>الملاحظات:</b> لا يمكن أن تتخطى 200 حرف.</li>");

       
        var errorHtml = '<ul style="text-align: right; direction: rtl; list-style-position: inside;">' + errorFields.join('') + '</ul>';

        Swal.fire({
            icon: 'error',
            title: 'خطأ في البيانات!',
            html: errorHtml, 
            confirmButtonColor: '#dc3545',
            confirmButtonText: 'تعديل البيانات'
        });
        return; 
    }

    var nameValue = namecard.value.trim();
    var phoneValue = phonecard.value.trim();
    var emailValue = emailcard.value.trim();
    var addressValue = addresscard.value.trim();
    var groupValue = groupcard.value;
    var notesValue = Notescard.value.trim();

    if (move !== undefined) {
        productcard[move].name = nameValue;
        productcard[move].phone = phoneValue;
        productcard[move].email = emailValue;
        productcard[move].address = addressValue;
        productcard[move].group = groupValue;
        productcard[move].note = notesValue;
        productcard[move].favCheck = favCheckcard.checked;
        productcard[move].emergCheck = emergCheckcard.checked;

        localStorage.setItem("card", JSON.stringify(productcard));
        display();
        clearForm();

        Swal.fire({
            icon: 'success',
            title: 'تم التعديل!',
            text: 'تم تحديث بيانات جهة الاتصال بنجاح.',
            timer: 2000,
            showConfirmButton: false
        });
    } else {
        addcard();
        
        Swal.fire({
            icon: 'success',
            title: 'تمت الإضافة!',
            text: 'تم حفظ جهة الاتصال الجديدة بنجاح.',
            timer: 2000,
            showConfirmButton: false
        });
    }
    
    boxst.classList.add('d-none');
});

function addcard() {
    var infocard = {
        name: namecard.value.trim(),      
        phone: phonecard.value.trim(),    
        email: emailcard.value.trim(),
        address: addresscard.value,
        group: groupcard.value,
        note: Notescard.value,
        favCheck: favCheckcard.checked,
        emergCheck: emergCheckcard.checked,
        colorKey: getRandomColorKey()
    };

    productcard.push(infocard);
    localStorage.setItem("card", JSON.stringify(productcard));

    display();
    clearForm();
}

function delet(index){
    Swal.fire({
        title: 'هل أنت متأكد؟',
        text: "لن تتمكن من استعادة بيانات جهة الاتصال هذه بعد حذفها!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'نعم، احذفها!',
        cancelButtonText: 'إلغاء'
    }).then((result) => {
        if (result.isConfirmed) {
            productcard.splice(index, 1);
            localStorage.setItem("card", JSON.stringify(productcard));
            display();

            Swal.fire({
                icon: 'success',
                title: 'تم الحذف!',
                text: 'تم حذف جهة الاتصال بنجاح.',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

function update(index) {
  move = index;

  namecard.value = productcard[index].name;
  phonecard.value = productcard[index].phone;
  emailcard.value = productcard[index].email;
  addresscard.value = productcard[index].address;
  groupcard.value = productcard[index].group;
  Notescard.value = productcard[index].note;

  favCheckcard.checked = productcard[index].favCheck;
  emergCheckcard.checked = productcard[index].emergCheck;

  boxst.classList.remove("d-none");
}

function updateStats() {
  var total = productcard.length;

  var favorites = productcard.filter(function (card) {
    return card.favCheck === true;
  }).length;

  var emergency = productcard.filter(function (card) {
    return card.emergCheck === true;
  }).length;


  document.getElementById("totalCount").innerText = total;
  document.getElementById("favCount").innerText = favorites;
  document.getElementById("emergCount").innerText = emergency;
}


function toggleFavorite(index) {
  
    productcard[index].favCheck = !productcard[index].favCheck;
    
    localStorage.setItem("card", JSON.stringify(productcard));
    
   
    display();
}


function toggleEmergency(index) {

    productcard[index].emergCheck = !productcard[index].emergCheck;
    
  
    
 
    localStorage.setItem("card", JSON.stringify(productcard));
    
   
    display();
}
boxst.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); 
    btnmodalsave.click(); 
  }
});