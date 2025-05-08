import { sideWithPadding, svgHeightWithPadding } from "./graphUtil";
type Props = {
  title: string;
  conversation_name: string;
  date: string;
  n: number;
};
export const exportSVG = ({ title, conversation_name, date, n }: Props) => {
  function downloadSVGAsPNG(svgElement: SVGSVGElement, fileName: string) {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    const img = new Image();
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    img.crossOrigin = "anonymous"; // クロスオリジン対応

    img.onload = () => {
      const scale = 4;
      const width = sideWithPadding * scale;
      const height = svgHeightWithPadding * scale;
      canvas.width = width;
      canvas.height = height;

      // 背景を白で塗りつぶす
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);

      // スケーリングしてSVGを描画
      context.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);

      // 右下にテキストを描画
      const text = `JAPAN CHOICE 世論地図: 「${title}」についての可視化(${date}時点 N=${n})`;
      if (text) {
        context!.font = `${12 * scale}px Arial`; // フォントサイズやスタイルを指定
        context!.fillStyle = "gray"; // テキストカラー
        const textWidth = context!.measureText(text).width;
        context!.fillText(text, width - textWidth - 10, height - 10); // 右下に配置
      }
      // PNGとしてダウンロード
      const imgURI = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imgURI;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src = url;
  }

  const svgElement = document.getElementById("svg") as unknown as SVGSVGElement;
  downloadSVGAsPNG(svgElement, `${conversation_name}.png`);
};
