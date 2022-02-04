//JavaScript source code
//drawing マウスダウンするとtrue,マウスアップするとfalse
//dragging マウスダウンしたままムーブするとtrue,
var drawing = false;
var dragging = false;
// 前回の座標を記録
var before_x = 0;
var before_y = 0;
// 矩形用
var MIN_WIDTH = 3;
var MIN_HEIGHT = 3;
var canvas, stx;
var rect_sx = 0;
var rect_sy = 0;
var rect_ex = 0;
var rect_ey = 0;
//矩形用イメージ
var image = new Image();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)) {
    ua = 'iphone';
} else if (navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('Android') > 0) {
    ua = 'sp';
} else if (navigator.userAgent.indexOf('Safari') > 0 && navigator.userAgent.indexOf('Chrome') == -1 && typeof document.ontouchstart !== 'undefined') {
    ua = 'tab';
} else {
    ua = 'other';
}

//イベントの振り分け
var EVENT = {};
if (ua != 'other') {//スマートフォンだったら
    EVENT.TOUCH_START = 'touchstart';
    EVENT.TOUCH_MOVE = 'touchmove';
    EVENT.TOUCH_END = 'touchend';
} else {//パソコンだったら
    EVENT.TOUCH_START = 'mousedown';
    EVENT.TOUCH_MOVE = 'mousemove';
    EVENT.TOUCH_END = 'mouseup';
}

// マウスボタンを押した時
canvas.addEventListener('mousedown', function (e) {
    drawing = true;
    var rect = e.target.getBoundingClientRect();
    before_x = e.clientX - rect.left;
    before_y = e.clientY - rect.top;
});

// マウスをクリックしていない時
canvas.addEventListener('mouseup', function () {
    drawing = false;
    dragging = false;
});

// マウス動かしているとき
canvas.addEventListener('mousemove', function () {
    mousemove = true;
    if(drawing) dragging = true;
});

// 描画の処理
function draw_canvas(e) {
    if (!drawing) {
        return
    }
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var w = document.getElementById('width').value;
    var color = document.getElementById('color').value;
    var r = parseInt(color.substring(1, 3), 16);
    var g = parseInt(color.substring(3, 5), 16);
    var b = parseInt(color.substring(5, 7), 16);
    // 描画
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
    ctx.lineWidth = w * 1.5;
    ctx.beginPath();
    ctx.moveTo(before_x, before_y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    // 描画最後の座標を前回の座標に代入する
    before_x = x;
    before_y = y;
}

var pen = document.getElementById('pencil');
var era = document.getElementById('eraser');
var scr = document.getElementById('scroll');
var sen = document.getElementById('sentaku');

// スクロール禁止関数
function disableScroll(event) {
    event.preventDefault();
}

var btnNum = 1;

// 鉛筆、消しゴム、スクロール、矩形選択
function tool(btn) {
    document.removeEventListener('touchmove', disableScroll, { passive: false });
    document.body.classList.remove('overflow-hidden');
    canvas.removeEventListener('mousemove', draw_canvas);
    // スクロールボタン
    if (btn == 1) {
        btnNum = 1;
        scr.className = 'active';
        pen.className = '';
        era.className = '';
        sen.className = '';
    }
    // 鉛筆ボタン
    else if (btn == 2) {
        btnNum = 2;
        document.addEventListener('touchmove', disableScroll, { passive: false });
        document.body.classList.add('overflow-hidden');
        ctx.globalCompositeOperation = 'source-over';
        canvas.addEventListener('mousemove', draw_canvas);
        scr.className = '';
        pen.className = 'active';
        era.className = '';
        sen.className = '';
    }
    // 消しゴムボタン
    else if (btn == 3) {
        btnNum = 3;
        document.addEventListener('touchmove', disableScroll, { passive: false });
        document.body.classList.add('overflow-hidden');
        ctx.globalCompositeOperation = 'destination-out';
        canvas.addEventListener('mousemove', draw_canvas);
        scr.className = '';
        pen.className = '';
        era.className = 'active';
        sen.className = '';
    }
    // 範囲選択ボタン
    else if (btn == 4) {
        btnNum = 4;
        document.addEventListener('touchmove', disableScroll, { passive: false });
        document.body.classList.add('overflow-hidden');
        scr.className = '';
        pen.className = '';
        era.className = '';
        sen.className = 'active';
    }
}

window.addEventListener('load', function () {
    //RecCanvasの定義 1×1
    rec_canvas = document.getElementById("RecCanvas");
    rec_ctx = rec_canvas.getContext("2d");
    rec_canvas.width = rec_canvas.height = 1;
    //保存済みノート画面を表示するCanvasの定義
    //Canvas[0] 1×1
    canvas0 = document.getElementById("Canvas[0]");
    ctx0 = canvas0.getContext("2d");
    canvas0.width = canvas0.height = 1;
    //Canvas[1] 1×1
    canvas1 = document.getElementById("Canvas[1]");
    ctx1 = canvas1.getContext("2d");
    canvas1.width = canvas1.height = 1;
    //Canvas[2] 1×1
    canvas2 = document.getElementById("Canvas[2]");
    ctx2 = canvas2.getContext("2d");
    canvas2.width = canvas2.height = 1;
    //Canvas[3] 1×1
    canvas3 = document.getElementById("Canvas[3]");
    ctx3 = canvas3.getContext("2d");
    canvas3.width = canvas3.height = 1;
    //Canvas[4] 1×1
    canvas4 = document.getElementById("Canvas[4]");
    ctx4 = canvas4.getContext("2d");
    canvas4.width = canvas4.height = 1;

    //選択範囲を描画
    image.src = canvas.toDataURL();
    ctx.drawImage(image, 0, 0);
    
    var background = new Image();
    background.src = "gridpaper.jpg";
    canvas.height = 500;
    canvas.width = 357;
    background.onload = function () {
        //canvas_widthを height / width倍する.
        ctx.drawImage(background, 0, 0, canvas.width, background.height * canvas.width / background.width);
    }

    document.getElementById('sentaku').addEventListener('onclick', function (e) {
        e.preventDefault();
        tool(4);
    });

    var img_datas_cnt = 0;
    var img_datas_arr = new Array();
    var inSelecting = false;

    //ウィンドウリサイズ時
    window.addEventListener('resize', function (event) {
        // canvasの位置座標を取得（描いたものを伸縮させないため、キャンバスの大きさを変える）
        clientRect = canvas.getBoundingClientRect();
        x = clientRect.left;
        y = clientRect.top;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        // 一度消して、保存していた配列データを全て描く（ウィンドウを大きくした場合に戻す）
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        for (var i = 0; i < img_datas_arr.length; i++) ctx.putImageData(img_datas_arr[i], 0, 0);
    });
    // マウスダウンイベントを設定
    window.addEventListener(EVENT.TOUCH_START, function (e) {
        //スマホだったら
        if (ua != 'other') e = e.touches[0];
        clientRect = canvas.getBoundingClientRect();
        x = clientRect.left;
        y = clientRect.top;
        startX = e.pageX - x;
        startY = e.pageY - y;
        
        //矩形
        if (btnNum == 4) {
            // 座標を求める
            if (!inSelecting) {
                inSelecting = true;
                var rect = e.target.getBoundingClientRect();
                rect_sx = rect_ex = e.clientX - rect.left;
                rect_sy = rect_ey = e.clientY - rect.top;
            }
        }
    });
    // マウスアップイベントを設定
    window.addEventListener(EVENT.TOUCH_END, function (e) {
        console.log("btnNum:" + btnNum)
        //ペン
        if (btnNum == 2) {
            ctx.globalCompositeOperation = 'source-over';
            // 配列に保存しておく
            img_datas_arr[img_datas_cnt] = ctx.getImageData(0, 0, canvas.width, canvas.height);
            img_datas_cnt++;
            image.src = canvas.toDataURL();
            ctx.drawImage(image, 0, 0);
        }
        //消しゴム
        if (btnNum == 3) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.globalCompositeOperation = 'destination-over';
            ctx.drawImage(background, 0, 0, canvas.width, background.height * canvas.width / background.width);
            // 配列に保存しておく
            img_datas_arr[img_datas_cnt] = ctx.getImageData(0, 0, canvas.width, canvas.height);
            img_datas_cnt++;
            ctx.globalCompositeOperation = 'destination-out';
            image.src = canvas.toDataURL();
        }
        //範囲選択
        if (btnNum == 4) {
            inSelecting = false;
            ctx.globalCompositeOperation = 'source-over';
            // キャンバスの範囲外は無効にする
            if (rect_sx === rect_ex && rect_sy === rect_ey) {
                // 初期化
                image.src = canvas.toDataURL();
                ctx.drawImage(image, 0, 0);
                rect_sx = rect_ex = 0;
                rect_sy = rect_ey = 0;
                rec_canvas.width = rec_canvas.height = 1;
            }
            // 矩形のサイズ
            rec_canvas.width = Math.abs(rect_sx - rect_ex);
            rec_canvas.height = Math.abs(rect_sy - rect_ey);
            // 指定のサイズ以下は無効にする[3x3]
            if (!(rec_canvas.width >= MIN_WIDTH && rec_canvas.height >= MIN_HEIGHT)) {
                image.src = canvas.toDataURL();
                ctx.drawImage(image, 0, 0);
                rect_sx = rect_ex = 0;
                rect_sy = rect_ey = 0;
                rec_canvas.width = rec_canvas.height = 1;
            } else {
                // 矩形用キャンバスへ画像の転送
                rec_ctx.drawImage(image, Math.min(rect_sx, rect_ex), Math.min(rect_sy, rect_ey), Math.max(rect_sx - rect_ex, rect_ex - rect_sx), Math.max(rect_sy - rect_ey, rect_ey - rect_sy), 0, 0, rec_canvas.width, rec_canvas.height);
            }
            ctx.drawImage(image, 0, 0);
        }
    });
    // マウスムーブイベントを設定
    window.addEventListener(EVENT.TOUCH_MOVE, function (e) {
        //スマホだったら
        if (ua != 'other') e = e.touches[0];
        if (btnNum == 4) {
            if (drawing) {
                ctx.globalCompositeOperation = 'source-over';
                // 座標を求める
                var rect = e.target.getBoundingClientRect();
                rect_ex = e.clientX - rect.left;
                rect_ey = e.clientY - rect.top;
                ctx.strokeStyle = 'rgb(0, 0, 0)';
                ctx.lineWidth =  1.5;
                ctx.drawImage(image, 0, 0);
                // 矩形の描画
                ctx.beginPath();
                // 上
                ctx.moveTo(rect_sx, rect_sy);
                ctx.lineTo(rect_ex, rect_sy);
                // 下
                ctx.moveTo(rect_sx, rect_ey);
                ctx.lineTo(rect_ex, rect_ey);
                // 右
                ctx.moveTo(rect_ex, rect_sy);
                ctx.lineTo(rect_ex, rect_ey);
                // 左
                ctx.moveTo(rect_sx, rect_sy);
                ctx.lineTo(rect_sx, rect_ey);

                ctx.stroke();
            }
        } else {
            if (dragging && (btnNum == 2 || btnNum == 3)){
                var w = document.getElementById('width').value;
                ctx.lineWidth =  w * 1.5;
                var color = document.getElementById('color').value;
                var r = parseInt(color.substring(1, 3), 16);
                var g = parseInt(color.substring(3, 5), 16);
                var b = parseInt(color.substring(5, 7), 16);
                ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                draw(e.pageX - x, e.pageY - y);
            }
        }
    });
    // キャンバスに描く
    function draw(x, y) {
        var target = document.getElementById('canvas');
        var context = target.getContext('2d');
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(x, y);
        context.closePath();
        context.stroke();
        startX = x;
        startY = y;
    }
    //クリアボタンクリック時
    document.getElementById('delbt').addEventListener(EVENT.TOUCH_START, function (e) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(background, 0, 0, canvas.width, background.height * canvas.width / background.width);
        return false;
    });
    // 保存ボタンクリック時
    document.getElementById('savebt').addEventListener(EVENT.TOUCH_START, function (e) {
        //背景色
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(background, 0, 0, canvas.width, background.height * canvas.width / background.width);
        // 要素のイベントをリセットしておく
        e.preventDefault();
        Fnk_SaveBt();

        if(canvas4.width = 1){
            canvas4.height = 500;
            canvas4.width = 357;
            var base64_4 = canvas.toDataURL();
            // LocalStorageに保存する
            window.localStorage.setItem("saveKey4", base64_4);
            // LocalStroageからデータを取得する
            var base64_4 = window.localStorage.getItem("saveKey4");
            var image4 = new Image();
            image4.src = base64_4;
            ctx4.drawImage(image4, 0, 0);
        }
        if(canvas3.width = 1){
            canvas3.height = 500;
            canvas3.width = 357;
            var base64_3 = canvas.toDataURL();
            // LocalStorageに保存する
            window.localStorage.setItem("saveKey3", base64_3);
            // LocalStroageからデータを取得する
            var base64_3 = window.localStorage.getItem("saveKey3");
            var image3 = new Image();
            image3.src = base64_3;
            ctx3.drawImage(image3, 0, 0);
        }
        if(canvas2.width = 1){
            canvas2.height = 500;
            canvas2.width = 357;
            var base64_2 = canvas.toDataURL();
            // LocalStorageに保存する
            window.localStorage.setItem("saveKey2", base64_2);
            // LocalStroageからデータを取得する
            var base64_2 = window.localStorage.getItem("saveKey2");
            var image2 = new Image();
            image2.src = base64_2;
            ctx2.drawImage(image2, 0, 0);
        }
        if(canvas1.width = 1){
            canvas1.height = 500;
            canvas1.width = 357;
            var base64_1 = canvas.toDataURL();
            // LocalStorageに保存する
            window.localStorage.setItem("saveKey1", base64_1);
            // LocalStroageからデータを取得する
            var base64_1 = window.localStorage.getItem("saveKey1");
            var image1 = new Image();
            image1.src = base64_1;
            ctx1.drawImage(image1, 0, 0);
        }
        if(canvas0.width = 1){
            canvas0.height = 500;
            canvas0.width = 357;
            var base64_0 = canvas.toDataURL();
            // LocalStorageに保存する
            window.localStorage.setItem("saveKey0", base64_0);
            // LocalStroageからデータを取得する
            var base64_0 = window.localStorage.getItem("saveKey0");
            var image0 = new Image();
            image0.src = base64_0;
            ctx0.drawImage(image0, 0, 0);
        }

        return false;
    });
    // canvas上のイメージを保存
    function Fnk_SaveBt() {
        // base64エンコード
        var base64 = canvas.toDataURL('image/jpeg');
        var blob = Base64toBlob(base64);

        // blobデータをa要素を使ってダウンロード
        saveBlob(blob, 'note.jpg');
    }
    // Base64データをBlobデータに変換
    function Base64toBlob(base64) {
        // カンマで分割し、base64データの文字列をデコード
        var tmp = base64.split(',');
        var data = atob(tmp[1]);
        // tmp[0]の文字列（data:image/png;base64）からコンテンツタイプ（image/png）部分を取得
        var mime = tmp[0].split(':')[1].split(';')[0];
        //  1文字ごとにUTF-16コードを表す 0から65535 の整数を取得
        var buf = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++) buf[i] = data.charCodeAt(i);
        // blobデータを作成
        var blob = new Blob([buf], { type: mime });
        return blob;
    }
    // 画像のダウンロード
    function saveBlob(blob, fileName) {
        var url = (window.URL || window.webkitURL);
        // ダウンロード用のURL作成
        var dataUrl = url.createObjectURL(blob);
        // イベント作成
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        // a要素を作成
        var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        a.href = dataUrl;
        a.download = fileName;
        a.dispatchEvent(event);
    }
});
