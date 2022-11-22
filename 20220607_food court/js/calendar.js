const setCalendar = (year, month) => {
    // 오늘 년, 오늘 월, 1 날짜 객체 구하자
    let firstDate = new Date(year, month - 1, 1);
    // 그 객체 요일 구하자
    let firstDay = firstDate.getDay();
    console.log(`${year}-${month} ${firstDay}요일`) //2022-9 4요일
    // html 제어하자

    // 오늘 년, 오늘 월+1, 0 날짜 객체 구하자
    let lastDate = new Date(year, month, 0).getDate();
    console.log(`${lastDate}일`)    //30일

    //제목 표시하자
    //HTML id -> js 변수
    const yearSpan = document.getElementById("year");
    const monthSpan = document.getElementById("month");
    //js.innerHTML 설정하자
    yearSpan.innerHTML = year;
    monthSpan.innerHTML = month;

    //1~lastDate까지 반복하자
    const dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];
    dateGridContainerDiv.innerHTML = '';    //초기화
    for (let i = 1; i <= lastDate; i++) {
        //<div class="grid-item">$</div> -> <div class="date-grid-container"> 하위
        //새로운 element 만들자
        let newElem = document.createElement("div");
        //그 element class="grid-item"
        newElem.classList.add("grid-item");
        //그 element 텍스트 = i
        newElem.innerHTML = i
        //.date-grid-container에 자식으로 붙이자
        dateGridContainerDiv.appendChild(newElem);
    }

    //1일: grid-column-start: 요일 + 1;
    let firstDateDiv = dateGridContainerDiv.getElementsByClassName("grid-item")[0];
    firstDateDiv.style.gridColumnStart = firstDay + 1;

    //event
    for (let gridItem of gridItems) {
        gridItem.onmouseover = handler;
        // gridItem.addEventListener("mouseover", handler);
    }
}
//prevMonth 함수
const prevMonth = () => {
    //이전 월 구하자
    month--;
    if (month == 0) {
        month = 12;
        year--;
    }
    //setCalendar(년, 구한 월);
    setCalendar(year, month);
}

//nextMonth 함수
const nextMonth = () => {
    //다음 월 구하자
    month++;
    if (month == 13) {
        month = 1;
        year++;
    }
    //setCalendar(년, 구한 월);
    setCalendar(year, month);
}

//prev버튼 누르면 prevMonth 함수 실행하자
prev_btn.onclick = prevMonth;   //() 쓰지마 승빈아. ()쓰면 함수 실행한 결과를 넣는거야. 근데 리턴값없으니 undefined야
//next버튼 누르면 nextMonth 함수 실행하자
next_btn.onclick = nextMonth;




// 오늘 구하자
let today = new Date();
// 오늘 년 구하자
let year = today.getFullYear();
// 오늘 월 구하자
let month = today.getMonth();   //0~11
month++;

setCalendar(year, month);