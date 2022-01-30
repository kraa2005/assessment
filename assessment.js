'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllchildren(element) {
  while(element.firstChild) {  //python と同じでループ
    //resultDivided のエリアにfirstChild(the result of first name typed)がある限りremoveする
    element.removeChild(element.firstChild);
  } //resultDivided のrremoveChild で最初のを消す、消しても同じのが出るから別にいい。それに一回ずつ消せば、二人目の名前が入力された時、一人目のに変わって出てくる
}

assessmentButton.onclick = () =>{   //function ()は () =>と書ける そしてアロー関数と呼ばれる
  const userName = userNameInput.value;
  console.log(userName);
  if (userName.length === 0) {
    //名前がない時は終了
    return;
  }
  console.log(assessment(userName));

  removeAllchildren(resultDivided); //診断結果表示エリアの初期化

  //result area
  const h3 =document.createElement('h3');     // これはjavascriptでタグを作ったりする方法。そして、innerTextで中身を書く
　h3.innerText ='Here is the result';                    //そしてｈ3　などのタグの場合は、headerで呼び出して変更できる
  resultDivided.appendChild(h3);              //このやり方だと最初に表示した文字を後から変更したりできる。（谷化を足したりなど）
  //createElement と　innertext を使えば、textの編集が簡単になる。要するに、毎回document.write()で出すんじゃなくて、innertextを使って一部分を編集したりして出す。

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // TODO ツイートエリアの作成
  removeAllchildren(tweetDivided); //tweet area を毎回初期化
  const anchor = document.createElement('a');
  const href = 
  'https://twitter.com/intent/tweet?button_hashtag=myresult&ref_src=twsrc%5Etfw'   
  anchor.setAttribute('href', href);     //a tag を追加したので、setAttribute の中に　href というプロパティがあり、そこにリンク先の情報を設定
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #myresult';
  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数　(　下のassessment(username) の関数の説明　)
 * @param {srting} (parameters/引数) {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
  for (var a = 0; a < userName.length; a++){
    answerNum += userName.charCodeAt(a);
  }

  //typeされた文字を数字に変換
  var userNameNum = userName.charCodeAt(0);

  //数字化したものを回答範囲の0～15に変える
  var answerNum = userNameNum % answers.length;

  //診断結果
  var result = answers[answerNum];
  return result.replace(/\{userName\}/g, userName); 
}

console.log(assessment('kra'));
console.log(assessment('hashimoto'));
console.log(assessment('kra'));

// テストコード
//console.assert(
  assessment('kra') ===
    'kraのいいところは決断力です。kraがする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
//);
//console.assert(
  assessment('kra') === assessment('kra'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
//);
