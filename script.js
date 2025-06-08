let isSignedUp = false;

function toggleLanguage() {
    const html = document.documentElement;
    const langBtn = document.getElementById('lang-btn');
    const isArabic = html.getAttribute('lang') === 'ar';

    if (isArabic) {
        html.setAttribute('lang', 'en');
        langBtn.textContent = 'العربية';
        document.querySelector('.hero h1').textContent = 'Welcome to 7kaya';
        document.querySelector('.hero p').textContent = 'Shop the latest fashion trends your way';
        document.querySelector('.hero .btn').textContent = 'Shop Now';
        document.querySelector('.products h2').textContent = 'Our Products';
        document.querySelectorAll('.product-card h3')[0].textContent = 'Black T-Shirt';
        document.querySelectorAll('.product-card h3')[1].textContent = 'White Pants';
        document.querySelectorAll('.product-card .cart-btn')[0].textContent = 'Add to Cart';
        document.querySelectorAll('.product-card .cart-btn')[1].textContent = 'Add to Cart';
        document.querySelectorAll('.product-card .buy-btn')[0].textContent = 'Buy Now';
        document.querySelectorAll('.product-card .buy-btn')[1].textContent = 'Buy Now';
        document.querySelector('footer p').textContent = '© 2025 7kaya. All rights reserved.';
        document.querySelector('nav ul li:nth-child(1) a').textContent = 'Home';
        document.querySelector('nav ul li:nth-child(2) a').textContent = 'Products';
        document.querySelector('nav ul li:nth-child(3) a').textContent = 'Contact';
        document.querySelector('nav ul li:nth-child(4) a').textContent = 'Sign Up';
        document.querySelector('#signup-modal .modal-content h2').textContent = 'Sign Up';
        document.querySelector('#order-modal .modal-content h2').textContent = 'Place Order';
        document.getElementById('username').placeholder = 'Username';
        document.getElementById('email').placeholder = 'Email';
        document.getElementById('password').placeholder = 'Password';
        document.querySelector('#signup-form .btn').textContent = 'Sign Up';
        document.getElementById('size').options[0].textContent = 'Select Size';
        document.getElementById('quantity').placeholder = 'Quantity';
        document.querySelector('#order-form .btn').textContent = 'Confirm Order';
    } else {
        html.setAttribute('lang', 'ar');
        langBtn.textContent = 'English';
        document.querySelector('.hero h1').textContent = 'مرحبًا بك في 7kaya';
        document.querySelector('.hero p').textContent = 'تسوق أحدث صيحات الموضة بأسلوبك الخاص';
        document.querySelector('.hero .btn').textContent = 'تسوق الآن';
        document.querySelector('.products h2').textContent = 'منتجاتنا';
        document.querySelectorAll('.product-card h3')[0].textContent = 'تيشيرت أسود';
        document.querySelectorAll('.product-card h3')[1].textContent = 'بنطلون أبيض';
        document.querySelectorAll('.product-card .cart-btn')[0].textContent = 'أضف إلى السلة';
        document.querySelectorAll('.product-card .cart-btn')[1].textContent = 'أضف إلى السلة';
        document.querySelectorAll('.product-card .buy-btn')[0].textContent = 'اشترِ الآن';
        document.querySelectorAll('.product-card .buy-btn')[1].textContent = 'اشترِ الآن';
        document.querySelector('footer p').textContent = '© 2025 7kaya. كل الحقوق محفوظة.';
        document.querySelector('nav ul li:nth-child(1) a').textContent = 'الرئيسية';
        document.querySelector('nav ul li:nth-child(2) a').textContent = 'المنتجات';
        document.querySelector('nav ul li:nth-child(3) a').textContent = 'اتصل بنا';
        document.querySelector('nav ul li:nth-child(4) a').textContent = 'التسجيل';
        document.querySelector('#signup-modal .modal-content h2').textContent = 'التسجيل';
        document.querySelector('#order-modal .modal-content h2').textContent = 'تأكيد الطلب';
        document.getElementById('username').placeholder = 'اسم المستخدم';
        document.getElementById('email').placeholder = 'البريد الإلكتروني';
        document.getElementById('password').placeholder = 'كلمة المرور';
        document.querySelector('#signup-form .btn').textContent = 'التسجيل';
        document.getElementById('size').options[0].textContent = 'اختر الحجم';
        document.getElementById('quantity').placeholder = 'الكمية';
        document.querySelector('#order-form .btn').textContent = 'تأكيد الطلب';
    }
}

function openSignUpModal() {
    document.getElementById('signup-modal').style.display = 'flex';
}

function closeSignUpModal() {
    document.getElementById('signup-modal').style.display = 'none';
}

function openOrderModal(productName) {
    if (!isSignedUp) {
        alert(document.documentElement.getAttribute('lang') === 'ar' ? 
            'يرجى التسجيل أولاً!' : 
            'Please sign up first!');
        openSignUpModal();
        return;
    }
    document.getElementById('product-name').value = productName;
    document.getElementById('order-modal').style.display = 'flex';
}

function closeOrderModal() {
    document.getElementById('order-modal').style.display = 'none';
}

function addToCart(productName) {
    console.log(`Added ${productName} to cart`);
    alert(document.documentElement.getAttribute('lang') === 'ar' ? 
        `تم إضافة ${productName} إلى السلة` : 
        `${productName} added to cart`);
}

emailjs.init('u8Pf4ndlt7rs6AbKB');

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    emailjs.send('service_kp5co8s', 'template_ypw8u6w', {
        username: username,
        email: email,
        password: password,
        to_email: '7kaya1234@gmail.com'
    })
    .then(function() {
        alert(document.documentElement.getAttribute('lang') === 'ar' ? 
            'تم إرسال تفاصيل التسجيل بنجاح!' : 
            'Sign-up details sent successfully!');
        isSignedUp = true;
        closeSignUpModal();
        document.getElementById('signup-form').reset();
    }, function(error) {
        alert(document.documentElement.getAttribute('lang') === 'ar' ? 
            'فشل في إرسال تفاصيل التسجيل: ' + JSON.stringify(error) : 
            'Failed to send sign-up details: ' + JSON.stringify(error));
    });
});

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = document.getElementById('product-name').value;
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;

    emailjs.send('service_kp5co8s', 'template_order_7kaya', {
        product_name: productName,
        size: size,
        quantity: quantity,
        to_email: '7kaya1234@gmail.com'
    })
    .then(function() {
        alert(document.documentElement.getAttribute('lang') === 'ar' ? 
            'تم إرسال الطلب بنجاح!' : 
            'Order sent successfully!');
        closeOrderModal();
        document.getElementById('order-form').reset();
    }, function(error) {
        alert(document.documentElement.getAttribute('lang') === 'ar' ? 
            'فشل في إرسال الطلب: ' + JSON.stringify(error) : 
            'Failed to send order: ' + JSON.stringify(error));
    });
});
