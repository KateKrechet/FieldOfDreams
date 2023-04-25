const words = ['жупа', 'чихание', 'правда', 'гавкает', 'сковорода', 'болтливость']
const questions = ['Как у западных и южных славян назывались селение, деревня, курень?', 'Человеческие способности довольно велики. Например, мы можем собственными силами разогнать воздушный поток до 150–170 км/ч. В процессе чего человек способен произвести такой воздушный поток?', 'Польский ученый-математик Гуго Дионисий Штейнгауз, прославившийся также своими афоризмами, говорил: «Комплимент женщине должен быть правдивее, чем...»', 'В Швеции существует налог на собак, от которого многие пытаются уклониться. В налоговой инспекции в Стокгольме придумали забавный способ борьбы с неплательщиками: сотрудница службы Эльфрида Карлсон ходит по домам и делает это.', 'Что использовали в Китае для глажки белья вместо утюга?', 'По традиции в Китае муж может в одностороннем порядке объявить о расторжении брака по семейным обстоятельствам. Назовите одну из причин для этого.']
let word = []
let secret = []
let points = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 'приз', '*2', '*3', 'фига']
let points_number = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
let points_multiplication = ['*2', '*3']
// let points_bukva = ['+1']
let points_surprice = ['приз']
let points_bankrot = ['фига']
let points_null = [0]
let count = 0
let count_b = 0
let score = 0
let chance = 3
let all_popitka = 3
let popitka_b = 0
let popitka_n = 0

$(document).ready(function () {
    start()
    $('#rotate_field').prop('disabled', false)
    $('#butOK').prop('disabled', true)
    $('#gifts').hide()
})

function reload() {
    location.reload()
}

//функция появления вопроса
function start() {
    let r = Math.floor(Math.random() * 6)
    word = words[r].split('')
    console.log(word)
    for (let i = 0; i < word.length; i++) {
        secret.push('*')
    }
    console.log(secret)

    $('#vopros').text(questions[r])
    $('#slovo').text(secret.join(" "))
    $('#hat1').hide()
    $('#hat2').hide()

}

//вращаем колесо
function RotateField() {
    $('#letter').text(" ")

    if ($('.field').classList !== 'field_rotate') {
        $('.field').addClass('field_rotate')
    }
    setTimeout(
        function () {
            $('.field').removeClass('field_rotate')
        }, 1000)
    $('#butOK').prop('disabled', false)
    Points()


}

//результат вращения колеса
function Points() {
    let num = Math.floor(Math.random() * 15)
    let element = points[num]
    if (points_number.includes(element)) {
        $('#field').text(`Выпало очков: ${element} назовите букву`)
    } else if (points_bankrot.includes(element)) {
        $('#field').text(`Вы банкрот: вы пропускаете ход, ваш счет обнуляется, вращайте барабан`)
        $('#butOK').prop('disabled', true)
        score = 0
        count++
        popitka_b++
        console.log(popitka_b)
        all_popitka = chance - popitka_b
        $('#score').text(`У вас ${score} очков`)
        console.log(all_popitka)
        proverka()

    } else if (points_null.includes(element)) {
        $('#field').text(`Выпал 0: вы пропускаете ход, ваш счет остается прежним, вращайте барабан`)
        $('#butOK').prop('disabled', true)
        score += element
        count++
        $('#score').text(`У вас ${score} очков`)
        popitka_n++
        console.log(popitka_n)
        all_popitka = chance - popitka_n
        console.log(all_popitka)
        proverka()
    } else if (points_surprice.includes(element)) {
        $('#field').text(`Удача! +2000 баллов при угаданной букве!`)
    } else if (points_multiplication.includes(element)) {
        switch (element) {
            case('*2') : {
                $('#field').text(`Выпало *2 , назовите букву`)
                break
            }
            case('*3') : {
                $('#field').text(`Выпало *3 , назовите букву`)
                break
            }
        }
    }

}

//считаем очки
function Score() {
    let a = ($('#field').text()).split(" ")
    console.log(a)
    console.log(a.slice(0, 2).join(" "))
    switch (a.slice(0, 2).join(" ")) {
        case("Выпало очков:"): {
            score += Number(a[2])
            console.log(score)
            break
        }
        case("Удача! +2000"): {
            score += 2000
            console.log(score)
            break
        }
        case("Выпало *2"): {
            score *= 2
            console.log(score)
            break
        }
        case("Выпало *3"): {
            score *= 3
            console.log(score)
            break
        }
    }


}

//функция отгадывания буквы
function guess() {
    let bukva = $('input').val()
    for (let w in word) {
        if (bukva === word[w]) {
            console.log('yes')
            secret[w] = bukva
            $('#letter').text("Есть такая буква!")
            Score()
            $('#score').text(`У вас ${score} очков`)
            count++
            console.log(count)
            count_b++
            console.log(count_b)
            console.log(all_popitka)

        } else {
            console.log('no')
            // $('#letter').text("Такой буквы нет!")
            $('#score').text(`У вас ${score} очков`)
            count++
            console.log(count)
            console.log(all_popitka)
            console.log(word.length)


        }

    }
    let loop = Math.floor(count / word.length)
    console.log(loop)
    let count_x
    if (count_b > loop) {
        count_x = loop
    } else {
        count_x = count_b
    }
    all_popitka = chance - (loop - count_x) - popitka_n - popitka_b
    console.log(all_popitka)
    $('#slovo').text(secret.join(' '))
    console.log(word)
    console.log(secret)
    proverka()
    $('input').val("")
    $('#butOK').prop('disabled', true)

}

//победа/проигрыш
function proverka() {
    if (all_popitka <= 0) {
        $('#result').text('Вы проиграли!')

    } else if (secret.indexOf("*") == -1) {
        console.log('win')
        $('#result').text('Вы выиграли!')
        $('#gifts').show()
        if (score < 500) {
            $('#price_block1').hide()
            $('#car').hide()
            $('#tea').show()
            $('#tea_text').text("Утешительный приз! Вы получаете чайник!")
            score = 0
            $('#score').text(`У вас ${score} очков`)
        } else if (score >= 3000) {
            $('#price_block1').hide()
            $('#car').show()
            $('#tea').hide()
            $('#car_text').text("Суперприз! Автомобиль!")
            score = 0
            $('#score').text(`У вас ${score} очков`)
        } else {
            $('#price_block1').show()
            $('#car').hide()
            $('#tea').hide()

        }
    }
}

//достаточно ли очков на подарок ведущему
function GiftPrice(x, y) {
    if (score < 500) {
        $('#surVed').text("Недостаточно средств!")
        $('#hat+x+').hide()
        $('#hat+y+').hide()
    } else {
        score -= 500
        $('#surVed').text("Вы подарили подарок!")
        $('#score').text(`У вас ${score} очков`)
        if (x === 1) {
            $('#hat2').hide()
            $('#hat1').show()
        } else {
            $('#hat1').hide()
            $('#hat2').show()
        }

    }
}

function EndingGift(price) {
    if (score < price) {
        $('#price').text("Недостаточно средств!")
    } else {
        score -= price
        $('#price').text("Вы получили приз!")
        $('#score').text(`У вас осталось ${score} очков`)
    }
}

//новая игра
$('#new_game').click(reload)
//кнопки подарков
$('#tv').click(function () {
    EndingGift(1500)
})
$('#sm').click(function () {
    EndingGift(1000)
})
$('#mp').click(function () {
    EndingGift(500)
})

//кнопка ОК при вводе буквы
$('#butOK').click(guess)
//кнопка вращения колеса
$('#rotate_field').click(RotateField)
//подарок ведущему1
$('#butS1').click(surprise1)
//подарок ведущему2
$('#butS2').click(surprise2)

//функция нажатия на кнопку подарок 1
function surprise1() {
    GiftPrice(1, 2)
}

//функция нажатия на кнопку подарок 2
function surprise2() {
    GiftPrice(2, 1)
}