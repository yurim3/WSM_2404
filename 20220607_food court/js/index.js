// function say() {
//     console.log('hello world');
// }

// const say = function() {
//     console.log('hello world2');
// }

// const say = () => console.log('hello world3');
// say();
const addNow = (homeCardId) => {
  //html -> js
  const homeCard = document.getElementById(homeCardId);

  //시간 -> index번째 식사가 선택되어야하는지 결정
  //조식 끝: 8:00
  //중식 끝: 13:00
  //석식 끝: 17:50
  var now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  // console.log(hour, minute);  //14 30
  minute = hour * 60 + minute;
  if (minute >= 17 * 60 + 50) {
    //1070
    index = 0;
  } else if (13 * 60 <= minute) {
    index = 2;
  } else if (8 * 60 <= minute) {
    index = 1;
  } else {
    index = 0;
  }
  // console.log(index);

  //homeCard에서 index번째 card에 now 클래스 추가
  let card = homeCard.getElementsByClassName("card")[index];
  card.classList.add("now");
};
addNow("home-card");
//오늘의 날짜 표시하자
const showToday = () => {
  //오늘 구하고, 년, 월, 일, 요일 구하자
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let day = now.getDay();
  const namesOfTheDaysOfTheWeek_array = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
  ];
  // console.log(year, month, date, namesOfTheDaysOfTheWeek_array[day]);

  //문자열 형식 맞추고
  let title = `${year}.${month}.${date}(${namesOfTheDaysOfTheWeek_array[day]})`;
  // console.log(title);

  //HTML에 표시하자
  let cardDateDivs = document.querySelectorAll(".card-date");
  //let cardDateDivs = document.getElementsByClassName("card-date");
  for (cardDateDiv of cardDateDivs) {
    cardDateDiv.innerHTML = title;
  }
};
showToday();

//오늘의 급식 가져오고, 표시하자
const showTodayMenu = () => {
  //오늘 구하고, 년, 월, 일, 요일 구하자
  let now = new Date();

  //년, 월, 일 구하자
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();

  //급식API 요청할 url 만들자
  const KEY = "d1dc39d63a314f2387d2dbd1c732b392";
  const ATPT_OFCDC_SC_CODE = "B10"; //서울특별시교육청
  const SD_SCHUL_CODE = "7010569"; //미림여자정보과학고등학교
  let MLSV_YMD = `${year}${month.toString().padStart(2, "0")}${date
    .toString()
    .padStart(2, "0")}`; //YYYYMMDD
  // console.log(MLSV_YMD);
  let url =
    `https://open.neis.go.kr/hub/mealServiceDietInfo` +
    `?KEY=${KEY}` +
    `&Type=json` +
    `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}` +
    `&SD_SCHUL_CODE=${SD_SCHUL_CODE}` +
    `&MLSV_YMD=${MLSV_YMD}`;
  // + `&MMEAL_SC_CODE=${MMEAL_SC_CODE}`;
  // console.log(url);

  fetch(url) //요청하자
    .then((response) => response.json()) //응답 온 데이터 -> json
    .then((json) => showMenu(json)); //json -> HTML에 표시하자
};
const showMenu = (json) => {
  //HTML -> js 메뉴 표시하는 부분
  let menus = document.querySelectorAll(".card-menu");
  let breakfast = menus[0];
  let lunch = menus[1];
  let dinner = menus[2];
  //json 안에 조식, 중식, 석식 정보 빼오고
  try {
    if (json["mealServiceDietInfo"][0]["head"][1]["RESULT"]["CODE"] == "INFO-000") {
      //응답이 제대로 왔으면
      //json -> HTML
      try {
        let breakfastData = json["mealServiceDietInfo"][1]["row"][0]["DDISH_NM"];
        //(5.13.) 삭제하자
        breakfastData = breakfastData.replace(/\([0-9\.]*\)/g, ""); //정규표현식: (문자 숫자나 .문자 )문자
        // (             \(
        // 숫자 한글자    [0123456789]
        // .             \.
        // 0~n개         *
        // )             \)
        // 글로벌         g
        breakfast.innerHTML = breakfastData;
      } catch {
        breakfast.innerHTML = "없음";
      }
      try {
        let lunchData = json["mealServiceDietInfo"][1]["row"][1]["DDISH_NM"];
        lunchData = lunchData.replace(/\([0-9\.]*\)/g, "");
        lunch.innerHTML = lunchData;
      } catch {
        lunch.innerHTML = "없음";
      }
      try {
        let dinnerData = json["mealServiceDietInfo"][1]["row"][2]["DDISH_NM"];
        dinnerData = dinnerData.replace(/\([0-9\.]*\)/g, "");
        dinner.innerHTML = dinnerData;
      } catch {
        dinner.innerHTML = "없음";
      }
    } else {
      //응답이 이상하면
      //없음 표시하자
      breakfast.innerHTML = "없음";
      lunch.innerHTML = "없음";
      dinner.innerHTML = "없음";
    }
  } catch {
    //문제가 생기면 {'RESULT':}
    breakfast.innerHTML = "없음";
    lunch.innerHTML = "없음";
    dinner.innerHTML = "없음";
  }
  //HTML에 표시하자
};
showTodayMenu();
