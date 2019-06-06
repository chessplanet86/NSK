    var app = new Vue({
        el: "#app",
        data() {
            return {
                nameValid: [],
                name: '',
                last_name: '',
                phone: '',
                email: '',
                about: '',
                act1: '',
                act2: '',
                reportEmail: '',
                reportName: '',
                reportPhone: '',
                reportLastName: '',
                endStatusName: null,
                endStatusLastName: null,
                endStatusEmail: true,
                errorName: false,
                errorLastName: false,
                errorEmail: false,
                errorPhone: false,
                errorAbout: false,
                Status: 0,
                message: '',

                kind_1: false,
                kind_2: false,
                kind_3: false,
                kind_4: false,
                kind_5: false,

                choosen: [],


                ocupansyPhone: 0,
                ocupansyName: 0,
                ocupansyLastName: 0,
                ocupansyEmail: 0,
                ocupansyAbout: 0,
                ocupansyAct1: 0,
                ocupansyAct2: 0,

                countKind1: 0,

            }
        },
        methods: {
            clear() {
                // console.log('метод родительского дива');
                this.choosen.length = 0;
                this.kind_1 = false;
                this.kind_2 = false;
                this.kind_3 = false;
                this.kind_4 = false;
                this.kind_5 = false;

                if (this.choosen.length == 0) {
                    this.ocupansyAct1 = 0;
                    this.ocupansyAct2 = 0;
                }
            },

            choose() {

                var a = event.target;
                event.stopPropagation();
                var b = a.closest('figure');
                if (this.choosen.length < 2) {
                    switch (b.id) {
                        case 'kind_1':
                            this.kind_1 = !this.kind_1;
                            this.choosen.push(b.id);
                            break;

                        case 'kind_2':
                            this.kind_2 = !this.kind_2;
                            this.choosen.push(b.id);
                            break;

                        case 'kind_3':
                            this.kind_3 = !this.kind_3;
                            this.choosen.push(b.id);
                            break;
                        case 'kind_4':
                            this.kind_4 = !this.kind_4;
                            this.choosen.push(b.id);
                            break;
                        case 'kind_5':
                            this.kind_5 = !this.kind_5;
                            this.choosen.push(b.id);
                            break;
                    }

                }
                if (this.choosen.length == 2) {
                    if (this.choosen[0] == this.choosen[1]) {
                        this.choosen.length = 0;
                    }
                }





            },
            sendData() {
                event.stopPropagation();
                if (this.email.length == 0 || this.phone.length == 0 || this.errorName == false || this.errorLastName == false) {
                    if (this.email.length == 0) {
                        this.errorEmail = false
                        this.reportEmail = 'Поле не заполнено!'
                    }

                    if (this.phone.length == 0) {
                        this.errorPhone = false
                        this.reportPhone = 'Поле не заполнено!'
                    }

                    if (this.errorName == false) {
                        this.reportName = 'Обязательное поле имя/фамилия не заполнено!'
                    }
                    if (this.errorLastName == false) {
                        this.reportName = 'Обязательное поле имя/фамилия не заполнено!'
                    }



                } else {
                    $.ajax({
                        url: "https://workspace.ru/ajax/test/test.php",
                        method: "POST",
                        data: {
                            'NAME': this.name,
                            'LAST_NAME': this.last_name,
                            'PHONE': this.phone,
                            'EMAIL': this.email,
                            'ABOUT': this.about,
                            'ACT1': this.act1,
                            'ACT2': this.act2

                        },
                        success: data => {
                            try {
                                console.log(data);
                                if (data.success == true) {
                                    this.message = data.data.message;
                                }
                            }

                            catch (err) {
                                console.log('ошибка', err);

                            }
                        }
                    })

                }

            },
        },
        computed: {
            //Валидация имени на недопустимые символы.
            checkName() {
                if (this.name.length != 0) {

                    for (var i = 0; i < this.name.length; i++) {

                        if (this.name[i] >= 'a' && this.name[i] <= 'z' || this.name[i] == ' ' || this.name[i] >= 'A' && this.name[i] <= 'Z' || this.name[i] >= 'А' && this.name[i] <= 'Я' || this.name[i] >= 'а' && this.name[i] <= 'я') {
                            this.endStatusName++;
                        }
                    }

                    if (this.name.length != this.endStatusName) {
                        this.errorName = false;
                        this.reportName = 'В фамилии/имени должны быть символы латиницы или кирилицы, а также пробелы';
                    } else {
                        this.errorName = true;
                    }
                    this.endStatusName = 0;
                }
                if (this.name.length == 0) {
                    this.reportName = '';
                }
            },
            //Валидация фамилии на недопустимые символы
            checkLastName() {
                if (this.last_name.length != 0) {

                    for (var i = 0; i < this.last_name.length; i++) {

                        if (this.last_name[i] >= 'a' && this.last_name[i] <= 'z' || this.last_name[i] == ' ' || this.last_name[i] >= 'A' && this.last_name[i] <= 'Z' || this.last_name[i] >= 'А' && this.last_name[i] <= 'Я' || this.last_name[i] >= 'а' && this.last_name[i] <= 'я') {
                            this.endStatusLastName++;
                        }
                    }

                    if (this.last_name.length != this.endStatusLastName) {
                        this.reportName = 'В фамилии/имени должны быть символы латиницы или кирилицы, а также пробелы';
                        this.errorLastName = false;
                    } else {
                        this.errorLastName = true;
                    }
                    this.endStatusLastName = 0;
                }
                if (this.last_name.length == 0) {
                    this.reportName = '';
                }
            },
            checkPhone() {
                if (this.phone.length > 3) {
                    if (this.phone.match(/[+]/g) != null) {
                        if (this.phone.match(/[+]/g)[0] == '+') {
                            if (this.phone.match(/[+]/g).length > 1) {
                                this.errorPhone = false;
                                this.reportPhone = 'Неверный формат телефона, присутствует лишний +';
                                // console.log('неверный формат телефона, присутствует лишний +');
                            } else {
                                if (this.phone.match(/[0-9+ ]/g).length != this.phone.length) {
                                    var errorSimbolPhone = [];
                                    this.reportPhone = 'Присутствуют лишние символы:'
                                    for (var i = 0; i < this.phone.length; i++) {
                                        var a = this.phone.match(/[0-9+ ]/g).includes(this.phone[i])
                                        if (!a) {
                                            // console.log('лишний символ', this.phone[i]);
                                            errorSimbolPhone.push(this.phone[i]);
                                            this.reportPhone += ' ' + this.phone[i]
                                        }
                                    }
                                    // console.log(errorSimbolPhone);
                                }
                                else {
                                    this.errorPhone = true;
                                    this.reportPhone = 'телефон заполнен корректно';
                                }
                            }
                        } else {
                            // console.log('Телефон должен начинаться с +');
                            this.errorPhone = false;
                            this.reportPhone = 'Телефон должен начинаться с +';
                        }

                    } else {
                        // console.log('Телефон должен начинаться с +');
                        this.errorPhone = false;
                        this.reportPhone = 'Телефон должен начинаться с +'
                    }






                } else {
                    // console.log('неверное количество символов, в телефоне должно быть больше 3 симоволов');
                    if (this.phone.length == 0) {
                        this.reportPhone = '';
                    } else {
                        this.errorPhone = false;
                        this.reportPhone = 'в номере должно быть больше 3 симоволов';
                    }

                }

            },
            checkEmail() {
                // console.log(this.reportEmail);
                if (this.email.length > 5) {
                    var a = this.email.match(/[a-zA-Z0-9_@.-]/g);

                    if (a != null) {
                        if (a.length == this.email.length) {
                            var At_pozition = a.indexOf('@');
                            var point_pozition = a.indexOf('.');
                            if (At_pozition == 0 || At_pozition == -1 || At_pozition > point_pozition || point_pozition - At_pozition <= 2) {
                                this.reportEmail = '@ отсутствует, либо не может находиться в начале строки. Возможно забыли поставить точку.';
                                // console.log('Неправильная позиция @');
                                // console.log(At_pozition);
                                // console.log(point_pozition);
                            } else {
                                if (a.length - point_pozition <= 2) {
                                    this.reportEmail = 'Точка стоит в конце или после точки недостаточно символов';
                                    // console.log('Точка не на своем месте');
                                } else {
                                    this.errorEmail = true;
                                    this.reportEmail = '';
                                    // console.log('Все корректно');

                                }

                            }

                        } else {
                            this.errorEmail = false;
                            this.reportEmail = 'Недопустимые символы! Вводите почту латиницей';

                        }
                    } else {
                        this.errorEmail = false;
                        this.reportEmail = 'Недопустимые символы! Вводите почту латиницей';
                    }

                }

                else {
                    this.errorEmail = false;
                    if (this.email.length == 0) {
                        // this.reportEmail = '';
                    } else {
                        this.reportEmail = 'длина почты менее 5 символов';
                    }

                }


            },
            checkAbout() {
                // console.log(this.about.length);
                if (this.about.length > 3) {
                    this.errorAbout = true;

                }
            },
            checkAct() {
                try {
                    this.act1 = document.getElementById(this.choosen[0]).getElementsByTagName('figcaption')[0].innerHTML
                    this.act2 = document.getElementById(this.choosen[1]).getElementsByTagName('figcaption')[0].innerHTML
                }
                catch (err) {
                    // console.log(err);
                }

            },

            checkEnd() {

                if (this.errorAbout == true && this.about.length != 0) {
                    this.ocupansyAbout = 1;
                } else {
                    this.ocupansyAbout = 0;
                }

                if (this.errorEmail == true && this.email.length != 0) {
                    this.ocupansyEmail = 1;
                } else {
                    this.ocupansyEmail = 0;
                }
                if (this.errorName == true && this.name.length != 0) {
                    this.ocupansyName = 1;
                } else {
                    this.ocupansyName = 0;
                }
                if (this.errorLastName == true && this.last_name.length != 0) {
                    this.ocupansyLastName = 1;
                } else {
                    this.ocupansyLastName = 0;
                }
                if (this.errorPhone == true && this.phone.length != 0) {
                    this.ocupansyPhone = 1;
                } else {
                    this.ocupansyPhone = 0;
                }

                if (this.choosen[0] != null) {
                    this.ocupansyAct1 = 1;
                } else {
                    this.ocupansyAct1 = 0;
                }

                if (this.choosen[1] != null) {
                    this.ocupansyAct2 = 1;
                } else {
                    this.ocupansyAct2 = 0;
                }

                this.Status = Math.round((this.ocupansyAbout + this.ocupansyEmail + this.ocupansyName + this.ocupansyLastName + this.ocupansyPhone + this.ocupansyAct1 + this.ocupansyAct2) / 7 * 100);
                // console.log(this.ocupansyName);
                // console.log(this.ocupansyAbout);
                // console.log(this.ocupansyLastName);
                // console.log(this.ocupansyEmail);
                // console.log(this.ocupansyPhone);
            }



        }
    })
