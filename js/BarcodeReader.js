class BarcodeReader {

    //競合する場合は修正する
    wrapperId = "barcode-wrapper";
    viewId = "barcode-view";
    messageId = "message";
    inputId = "barcode-input";
    //----

    videoSize = { w: 640, h: 480 };
    viewSize = { w: 300, h: 200 };
    targetSize = { w: 200, h: 100, border: 2 };
    wrapperElement = null;//この領域を表示非表示にする
    viewElement = null;//表示される画像洋装
    viewContext = null;//表示される画像要素のコンテキスト
    targetElement = null;//バーコード部の要素
    targetContext = null;//バーコード部のコンテキスト
    inputElement = null;//結果が戻る要素 value値にせっとする
    messageElement = null;//エラー時メッセージがinnerHTMLとしてセットされる
    blnCameraInit = false;//カメラ初期化が正常終了したかどうか
    video = null;
    scanInterval = 100;//スキャンインターバル
    validationCnt = 3; //スキャンチェック回数
    validatainWkCnt = 0;//スキャンチェックワーク(回数)
    validationCode = "";//スキャンチェックワーク(コード)

    blnScaning = false;//スキャン中かどうか
    reserveEnd = null;//スキャン終了予約

    //表示領域用のパラメータ
    viewParam = {
        init: false,
        sx: 0,
        sy: 0,
        sw: 0,
        sh: 0,
        dx: 0,
        dy: 0,
        dw: 0,
        dh: 0
    };

    //バーコードスキャン部分のパラメータ
    targetParam = {
        sx: 0,
        sy: 0,
        sw: 0,
        sh: 0,
        dx: 0,
        dy: 0,
        dw: 0,
        dh: 0
    };

    //バーコードガイドのパラメータ
    sqParam = {
        valid: false,
        x: 0,
        y: 0,
        w: 0,
        h: 0
    };

    // Quagga用のパラメータ
    qConfig = {
        locate: true,
        decoder: {
            readers: ["ean_reader", "ean_8_reader"],
            multiple: false, //同時に複数のバーコードを解析しない

        },
        locator: {
            halfSample: false,
            patchSize: "large"
        },
        src: ''//後から指定
    };

    constructor(element,
        videoSizeW, videoSizeH,
        viewSizeW, viewSizeH,
        targetSizeW, targetSizeH, border,
        scanInterval, validationCnt) {

        let strInnerHtml = '<input type="tel" id="' + this.inputId + '" maxlength="13" />';
        strInnerHtml += '<button onClick="toggleScan()">スキャン開始/停止</button>';
        strInnerHtml += '</div><div id="' + this.wrapperId + '" style="visibility: hidden; border: 2px solid #099;">';
        strInnerHtml += '<canvas id="' + this.viewId + '"></canvas>';
        strInnerHtml += '<p id="' + this.messageId + '">カメラ初期化中です</p>';

        //上記のコードを出力する都合上、togglescanという名前で呼び出したいのでwindowに関数をthisをバインドしてセット
        window.toggleScan = this.toggleScan.bind(this);

        element.innerHTML = strInnerHtml;

        this.videoSize.w = videoSizeW;
        this.videoSize.h = videoSizeH;
        this.viewSize.w = viewSizeW;
        this.viewSize.h = viewSizeH;
        this.targetSize.w = targetSizeW;
        this.targetSize.h = targetSizeH;
        this.targetSize.border = border;

        this.wrapperElement = document.getElementById(this.wrapperId);
        this.viewElement = document.getElementById(this.viewId);
        this.viewContext = this.viewElement.getContext("2d");;
        this.messageElement = document.getElementById(this.messageId);
        this.inputElement = document.getElementById(this.inputId);
        //バーコード部
        this.targetElement = document.createElement("canvas");
        this.targetContext = this.targetElement.getContext("2d");

        this.validationCnt = validationCnt;
        this.scanInterval = scanInterval;

        //カメラ映像領域作成（非表示）
        this.video = document.createElement("video");
        this.video.muted = true;
        this.video.playsInline = true;

        //カメラ、Quagga初期化
        this.initBarcodeScaner();

    }

    //バーコードスキャン初期化
    initBarcodeScaner() {

        //カメラ使用の許可ダイアログが表示される
        navigator.mediaDevices.getUserMedia(
            //マイクはオフ, カメラの設定   背面カメラを希望する 640×480を希望する
            { "audio": false, "video": { facingMode: "environment", "width": { "ideal": this.videoSize.w }, "height": { "ideal": this.videoSize.h } } }
        ).then(
            //カメラと連携が取れた場合
            (stream) => {
                this.video.srcObject = stream;

                //Quaggaのスキャンイベント
                Quagga.onDetected((result) => {
                    //スキャンを止める
                    // console.log(result.codeResult.code);
                    console.log( "ueda fix -> " , result.codeResult);
                    let item = document.getElementById( "txtOutput")
                    item.value = "★★★"
                    // ここから下に、テーブルに追加するコードを書く
                    // 参考URL　https://shanabrian.com/web/javascript/table-insertrow.php
                    // table要素を取得
var tableElem = document.getElementById('sample-table');

// tbody要素にtr要素（行）を最後に追加
var trElem = tableElem.tBodies[0].insertRow(-1);

// td要素を追加
var cellElem = trElem.insertCell(0);

// td要素にテキストを追加
cellElem.appendChild(document.createTextNode('セル'));



                    if (this.blnScaning == false) {
                        //遅延してスキャンデータが来た場合は無視
                        return;
                    }

                    if (this.validationCnt <= 1) {
                        this.scanEnd();
                        //コードをセット
                        this.inputElement.value = result.codeResult.code;
                    } else {
                        if (this.validationCode == result.codeResult.code) {
                            this.validatainWkCnt++;
                            if (this.validationCnt <= this.validatainWkCnt) {
                                this.scanEnd();
                                //コードをセット
                                this.inputElement.value = result.codeResult.code;
                                console.log("scan data !!")
                            }
                        } else {
                            this.validationCode = result.codeResult.code;
                            this.validatainWkCnt = 1;
                        }
                    }
                });

                this.blnCameraInit = true;
                this.messageElement.innerHTML = "スキャンしてください";
            }
        ).catch(
            //エラー時
            (err) => {
                console.log(err);
                switch (err.message) {
                    case "Requested device not found":
                        this.messageElement.innerHTML = "カメラ取得に失敗しました";
                        break;
                    default:
                        this.messageElement.innerHTML = err.message;
                }

            }
        );
    }

    //パラメータ初期化
    initParam() {

        //すでに初期化されていた場合は処理しない
        if (this.viewParam.init) {
            return;
        }

        //実際取得したサイズは要求したサイズと違う際は上書きされる。
        //videoが開始されていないと0になる
        this.videoSize.w = this.video.videoWidth
        this.videoSize.h = this.video.videoHeight;


        //canvasは属性値でサイズを指定する必要がある
        this.viewElement.setAttribute("width", this.viewSize.w);
        this.viewElement.setAttribute("height", this.viewSize.h);


        //表示領域の計算
        if (this.videoSize.w <= this.viewSize.w) {
            //元のサイズの方が小さかったらそのまま
            this.viewParam.sx = 0;
            this.viewParam.sw = this.videoSize.w;

            this.viewParam.dx = 0;
            this.viewParam.dw = this.videoSize.w;
        } else {
            //中央部を取得
            let wk = this.videoSize.w - this.viewSize.w;
            if (wk < 0) {
                this.messageElement.innerHTML = "サイズ設定不備(view-X)";
                this.blnCamerainit = false;
                return;
            }
            wk = wk / 2; //中央寄せするので÷2

            this.viewParam.sx = wk;
            this.viewParam.sw = this.viewSize.w;

            this.viewParam.dx = 0;
            this.viewParam.dw = this.viewSize.w;
        }
        if (this.videoSize.h <= this.viewSize.h) {
            //元のサイズの方が小さかったらそのまま
            this.viewParam.sy = 0;
            this.viewParam.sh = this.videoSize.h;

            this.viewParam.dy = 0;
            this.viewParam.dh = this.videoSize.h;
        } else {
            //中央部を取得
            let wk = this.videoSize.h - this.viewSize.h;
            if (wk < 0) {
                this.messageElement.innerHTML = "サイズ設定不備(view-Y)";
                this.blnCameraInit = false;
                return;
            }
            wk = wk / 2; //中央寄せするので÷2

            this.viewParam.sy = wk;
            this.viewParam.sh = this.viewSize.h;

            this.viewParam.dy = 0;
            this.viewParam.dh = this.viewSize.h;
        }

        //バーコードスキャン部分の計算
        if (this.videoSize.w <= this.targetSize.w) {
            //元のサイズの方が小さかったらそのまま
            this.targetParam.sx = 0;
            this.targetParam.sw = this.videoSize.w;

            this.targetParam.dx = 0;
            this.targetParam.dw = this.videoSize.w;
        } else {
            //中央部を取得
            let wk = this.videoSize.w - this.targetSize.w;
            if (wk < 0) {
                this.messageElement.innerHTML = "サイズ設定不備(target-X)";
                this.blnCamerainit = false;
                return;
            }
            wk = wk / 2; //中央寄せするので÷2

            this.targetParam.sx = wk;
            this.targetParam.sw = this.targetSize.w;

            this.targetParam.dx = 0;
            this.targetParam.dw = this.targetSize.w;
        }
        if (this.videoSize.h <= this.targetSize.h) {
            //元のサイズの方が小さかったらそのまま
            this.targetParam.sy = 0;
            this.targetParam.sh = this.videoSize.h;

            this.targetParam.dy = 0;
            this.targetParam.dh = this.videoSize.h;
        } else {
            //中央部を取得
            let wk = this.videoSize.h - this.targetSize.h;
            if (wk < 0) {
                this.messageElement.innerHTML = "サイズ設定不備(target-Y)";
                this.blnCamerainit = false;
                return;
            }
            wk = wk / 2; //中央寄せするので÷2

            this.targetParam.sy = wk;
            this.targetParam.sh = this.targetSize.h;

            this.targetParam.dy = 0;
            this.targetParam.dh = this.targetSize.h;
        }

        //バーコードガイドの設定
        this.sqParam.valid = true;
        this.sqParam.w = this.targetSize.w;
        this.sqParam.h = this.targetSize.h;
        this.sqParam.x = (this.viewSize.w - this.targetSize.w) / 2;
        if (this.sqParam.x < 0) {
            this.sqParam.valid = false;
        }
        this.sqParam.y = (this.viewSize.h - this.targetSize.h) / 2;
        if (this.sqParam.y < 0) {
            this.sqParam.valid = false;
        }

        this.viewParam.init = true;
    }

    toggleScan() {
        if (this.wrapperElement.style.visibility == "visible") {
            this.scanEnd();
        } else {
            this.scanStart();
        }
    }

    scanStart() {
        this.video.play();
        //setIntervalだと処理の遅延のかかわらず実行してしまうので都度再帰する。

        this.wrapperElement.style.visibility = "visible";


        if (this.blnCameraInit == false) {
            this.reserveEnd = setTimeout(() => {
                this.wrapperElement.style.visibility = "hidden";
            }, 3000);
        } else {
            this.blnScaning = true;
            setTimeout(this.scanning.bind(this), 0);
        }
    }

    scanning() {
        //スキャン本体
        if (this.blnScaning == false) {
            return;
        }

        //パラメータ初期化()
        this.initParam();

        this.blnScaning = true;

        //バーコードエリアに線画
        this.targetContext.drawImage(this.video, this.targetParam.sx, this.targetParam.sy, this.targetParam.sw, this.targetParam.sh, this.targetParam.dx, this.targetParam.dy, this.targetParam.dw, this.targetParam.dh);

        //線画からバーコード解析
        this.targetElement.toBlob((blob) => {
            let reader = new FileReader();
            reader.onload = () => {
                this.qConfig.src = reader.result;
                Quagga.decodeSingle(this.qConfig, function () { });
            }
            reader.readAsDataURL(blob);
        });

        //プレビューエリアに線画
        //処理が遅くなるような場合は、scanningCntを使ってプレビューの線画を間引く
        //if (scanningCnt % 2 == 0) {}
        this.viewContext.drawImage(this.video, this.viewParam.sx, this.viewParam.sy, this.viewParam.sw, this.viewParam.sh, this.viewParam.dx, this.viewParam.dy, this.viewParam.dw, this.viewParam.dh);

        //バーコードガイドの線画
        if (this.sqParam.valid) {
            this.viewContext.beginPath();
            this.viewContext.strokeStyle = "rgb(255,0,0)";
            this.viewContext.lineWidth = this.targetSize.border;
            this.viewContext.rect(this.sqParam.x, this.sqParam.y, this.sqParam.w, this.sqParam.h);
            this.viewContext.stroke();
        }

        //再帰
        setTimeout(this.scanning.bind(this), this.scanInterval);
    }

    scanEnd() {
        if (this.reserveEnd != null) {
            clearTimeout(this.reserveEnd);
        }
        this.blnScaning = false;
        this.video.pause();
        this.wrapperElement.style.visibility = "hidden";
        this.validatainWkCnt = 0;
        this.validationCode = "";
        console.log("Object terminated.")
    }
}

module.exports = BarcodeReader;

