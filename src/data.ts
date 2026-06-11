import { FoodItem, Attraction, StatItem, ParkingStatus } from "./types";

export const STATS_DATA: StatItem[] = [
  {
    id: "history",
    count: "500+",
    label: "多年歷史",
    description: "自清領時期便是繁榮的商業集散地，見證五百年歲月更迭。"
  },
  {
    id: "street",
    count: "200m",
    label: "古韻街道",
    description: "保留完整的傳統紅磚、紅瓦與巴洛克式拱廊建築，別具一番風情。"
  },
  {
    id: "scale",
    count: "#1",
    label: "北海岸最古老",
    description: "台灣北部最富歷史底蘊的古老街道，保存最完整、最繁華的先民市集。"
  }
];

export const FOOD_DATA: FoodItem[] = [
  {
    id: "duck",
    name: "金山鴨肉",
    category: "必吃首選",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjL-F-PWhju_Ewc_HOJrs0QJSyLZWqAI_1Oux_8XCzAWF4eA9LC-TqAk_gcTXsGg3_wx9eNOqaoScbAuahpO1CndlT3t1KsFfM3JDZ_VRiDzYh_ZOmyMrLidUjtcxB4aSxc2VN1oWOfw-QeaClK7k21PdA809ab0zuQbJClaB9r1hCKSouPUKoq-J4F4717PxRPVA0OzzeM5uNUyUpJPbP77Xhf9MBLuWhJO31gKZ3pKQREZOHcs6a1HJ3qlUHqP9ZaOWljda1dVqE",
    description: "位於廣安廟前的傳奇美食，採獨特的自助取餐式，想吃什麼自己拿！多汁鮮甜的鴨肉與鮮美鴨湯麵，是造訪金山絕對不能錯過的經典美味。",
    isAvailable: true,
    mapLocation: "新北市金山區金包里街104號（廣安廟前）",
    averagePrice: "NT$ 200 - 400 / 人",
    recommendedHours: "09:00 - 18:30"
  },
  {
    id: "sweetpotato",
    name: "拔絲地瓜",
    category: "在地特產",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTXw9JfeDJFsmJqfhtlJVBxfvIg5IWN3k5gMmJAAg3Ari2by019cNMjch9pj0Qb_swthmTLwO3QDOXI14e4kmbCdGsd2uASJmbNrKS5N5xk2k1KidpUod5ax52_HqhjXb-ejd9Zw4TxipsRNSWdL1zW0EeEYYS2VR_aj4CnA1ypWOTLfjeQaZ3XML62ltk_UYx5UUbm91NYJIk2TmFuVzu9DdxT8VPS2oLuiokZoJhz2OYrWm6dTP1KLz8UCJN8LmA8bSqtoSGq-_p",
    description: "金山盛產優質紅心台農66號地瓜。熱騰騰的現炸地瓜塊裹上金黃酥脆的糖衣，一拉開便有晶瑩的糖絲。外脆冰冷、內軟香甜，甜而不膩且極富層次感。",
    isAvailable: true,
    mapLocation: "新北市金山區金包里街老街中心攤位",
    averagePrice: "NT$ 50 - 100 / 盒",
    recommendedHours: "10:00 - 18:00"
  },
  {
    id: "icecream",
    name: "地瓜冰淇淋",
    category: "季節限定",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC73wmIvOV6uL2rKOr6AZZ5FAMql3n9yz3yXZdJWVMw9_hC9yuRKBhQ4KsreaPF2VmiSBelf2IXB1hZCTA0OlNu1Ai5Ai0Zdy8W29HwMaM9pwsSZuZZPmB9M0m1FFGPXDufunALoaLvW7WeLC3URM9uW7T6lRPj_btDZrWWVYk_ABjy8C9J_fGhA-H92G66RS-yuk3uzxRzX_7j8xdlXyvf9wYoe8qNqjoffRoGntEJLnBj6xVSdUMpIbF2JuvNnPSKIDdCY94kh_uZ",
    description: "傳統與現代的完美結合。採用大金山地區新鮮紅心及黃金地瓜，不添加人工香料。口感極致綿密，入口帶著淡淡的烘烤地瓜焦香，是消暑的首選良伴。",
    isAvailable: true,
    mapLocation: "新北市金山區金包里街68號",
    averagePrice: "NT$ 60 - 80 / 份",
    recommendedHours: "10:30 - 18:30"
  }
];

export const ATTRACTION_DATA: Attraction[] = [
  {
    id: "shitoushan",
    name: "獅頭山公園",
    category: "世界級地質景觀",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBowukoABdxSXAoCBwLsXc6K99WujQEq6Qc8eoqC4dXFXhfOaSmCWifAb8c3bmMgJTLeTXzUybdwQgGOLPZs2yCnmZSM2GuUTlFgZGicHBqfrYtowL1PQ_fqIBsDN-eji4RKA1KeWK4WmXYu3I1mqFZtHb6PFYFHx0kpmNHEtBPxTDJo8ZZuDhxRSLVBK-YziRuZMpQJe9Au0hA4woxjeA6-58Fg3KnDwS-lJt0urrh0avGXG4CJjIH15T5QmjFhyDjjHVgmNMU8ZPT",
    description: "世界級地質景觀：在此能近距離欣賞海中著名地標「燭台雙嶼」，沿著輕鬆的景觀步道行進，飽覽北海岸遼闊、璀璨的海天一色景致。過去為軍事管制區，故保留了非常豐富的自然生態。",
    distance: "距離老街約 1.2 公里",
    duration: "建議遊玩 1.5 - 2 小時",
    routesDescription: "自金山老街徒步出發，沿民生路及公園路步行約 15 分鐘即可抵達步道入口。",
    highlights: ["植物生態豐富", "燭台雙嶼絕佳觀景點", "神祕海岸步道", "保存完好的舊軍事碉堡"]
  },
  {
    id: "hotspring",
    name: "金山溫泉",
    category: "洗滌疲憊的神經",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCslU5aJrSMcEkutRafzYNkajmIvS4xjNFh7QzdG8fDkboMRdB44Mi51M1884ecexMf30mhZwrbkgUNZ-qhV05E7cVm4vpjpT3o_4cvYXfT3U-xbYPhJZa6hXW5xRCSGqBJ0vlYyW9L5qUruHY72lD1sZ15ZinNVwsHyyFpv2uBNjRddanB-4jGoXphnL2jZrrS1ZL2QqUnVYyNzpXue6GU6Kmp-H9F9h-cleAyb5Eoz-6cjYsY0yxnv1ve8hzaqGKai2n-MUnx2TES",
    description: "洗滌一身的疲憊：金山溫泉水質非常特殊，擁有全台唯一的「海底溫泉」，同時還有硫磺泉、碳酸泉以及鐵泉等四種泉質。富含多種微量元素與礦物質，給您頂級、溫暖、放鬆身心的極致享受。",
    distance: "距離老街約 0.8 公里（溫泉區）",
    duration: "建議停留 2 - 3 小時",
    routesDescription: "出老街往中山路、溫泉路方向，步行僅需 8-10 分鐘，或搭乘公車於金山郵局站下車。",
    highlights: ["罕見海底溫泉泉質", "富含治癒性礦物質", "免費公共泡腳池", "多家日式與現代精緻湯屋選擇"]
  }
];

export const PARKING_STATUSES: ParkingStatus[] = [
  {
    name: "金山立體停車場",
    totalSpaces: 350,
    availableSpaces: 142,
    distanceText: "距離老街徒步 3 分鐘",
    priceText: "限每小時 NT$ 20（平日）/ NT$ 40（假日）"
  },
  {
    name: "金包里中山停車場",
    totalSpaces: 120,
    availableSpaces: 31,
    distanceText: "距離老街徒步 4 分鐘",
    priceText: "每小時 NT$ 30"
  },
  {
    name: "金山區公所旁排溝平面停車場",
    totalSpaces: 80,
    availableSpaces: 8,
    distanceText: "距離老街徒步 6 分鐘",
    priceText: "每次計費 NT$ 100"
  }
];
