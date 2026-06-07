import os
import sys
from PIL import Image

def compress_and_convert(input_dir, output_dir, max_width=1600, quality=80):
    """
    將指定目錄下的 PNG/JPG 圖片，調整最大寬度並轉為 WebP 格式，儲存至輸出目錄。
    """
    if not os.path.exists(input_dir):
        print(f"❌ 找不到輸入目錄: {input_dir}")
        print("💡 請先建立該目錄並放進你要處理的照片，或者重新執行並指定正確的路徑。")
        return

    os.makedirs(output_dir, exist_ok=True)
    
    # 支援的輸入格式
    valid_extensions = ('.png', '.jpg', '.jpeg', '.tiff', '.bmp')
    files = [f for f in os.listdir(input_dir) if f.lower().endswith(valid_extensions)]
    
    if not files:
        print(f"ℹ️ 在 '{input_dir}' 目錄中沒有找到任何 PNG 或 JPG 圖片。")
        return

    print(f"🚀 開始處理 {len(files)} 張圖片...")
    print(f"⚙️ 設定：最大寬度={max_width}px，WebP 品質={quality}%")
    print("-" * 50)

    success_count = 0
    for filename in files:
        input_path = os.path.join(input_dir, filename)
        
        # 產生輸出檔名 (強制轉為小寫，底線連接，副檔名改為 .webp)
        base_name = os.path.splitext(filename)[0]
        # 去除特殊字元，轉為小寫，空格與橫槓改為底線
        clean_name = base_name.strip().lower().replace(" ", "_").replace("-", "_")
        output_filename = f"{clean_name}.webp"
        output_path = os.path.join(output_dir, output_filename)

        try:
            with Image.open(input_path) as img:
                # 取得原始尺寸
                orig_width, orig_height = img.size
                
                # 如果圖片寬度大於最大寬度限制，則進行等比例縮放
                if orig_width > max_width:
                    ratio = max_width / float(orig_width)
                    new_height = int(float(orig_height) * float(ratio))
                    img_resized = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                    action = f"縮小並轉檔 ({orig_width}x{orig_height} -> {max_width}x{new_height})"
                else:
                    img_resized = img
                    action = "直接轉檔"

                # 轉成 RGB (避免 RGBA 轉 WebP 出現不相容問題，但 WebP 支援透明，所以若有透明度則保留)
                save_mode = img_resized.mode
                if save_mode in ('RGBA', 'LA') or (save_mode == 'P' and 'transparency' in img_resized.info):
                    # 保留透明通道的 WebP 儲存
                    img_resized.save(output_path, 'WEBP', quality=quality)
                else:
                    # 轉為 RGB 儲存，壓縮率更好
                    img_resized.convert('RGB').save(output_path, 'WEBP', quality=quality)
                
                # 計算壓縮率
                orig_size = os.path.getsize(input_path) / 1024
                new_size = os.path.getsize(output_path) / 1024
                ratio = (orig_size - new_size) / orig_size * 100 if orig_size > 0 else 0
                
                print(f"✅ [成功] {filename} -> {output_filename}")
                print(f"   📊 尺寸：{action}")
                print(f"   💾 體積：{orig_size:.1f} KB -> {new_size:.1f} KB (節省了 {ratio:.1f}%)")
                print("-" * 40)
                success_count += 1
                
        except Exception as e:
            print(f"❌ [錯誤] 無法處理檔案 {filename}。原因: {e}")
            print("-" * 40)

    print(f"\n🎉 處理完成！成功轉換 {success_count}/{len(files)} 張圖片。")
    print(f"📂 輸出圖片已存放在: {output_dir}")
    print("💡 記得在 HTML 中將圖片路徑更新為新產生的 .webp 檔案路記喔！")

if __name__ == '__main__':
    # 預設路徑 (相對於專案根目錄)
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    default_input = os.path.join(project_root, "assets", "raw_images")
    default_output = os.path.join(project_root, "assets", "images", "robots")

    # 確保 raw_images 目錄存在，方便使用者放入圖片
    os.makedirs(default_input, exist_ok=True)

    print("=" * 60)
    print("      FRC 9427 iDeer 官方網站圖片批次處理與壓縮工具 (WebP) 🦌⚙️")
    print("=" * 60)
    print(f"📝 本工具將會把輸入目錄中的所有圖片：\n  1. 寬度限制在 1600px 以內 (等比例縮小)\n  2. 轉為高壓縮率的 .webp 格式 (品質 80%)\n  3. 自動將檔名改為網頁友善的「小寫與底線」格式")
    print("-" * 60)
    print(f"1. 原始圖片放置區: {default_input}")
    print(f"2. 壓縮後輸出區: {default_output}")
    print("=" * 60)
    
    print(f"\n👉 請先將你的原始大圖放進：\n   {default_input}\n")
    confirm = input("確認已放好圖片，並開始壓縮處理？(Y/N): ").strip().lower()
    
    if confirm in ('y', 'yes', ''):
        compress_and_convert(default_input, default_output)
    else:
        print("❌ 操作已取消。請放置好圖片後再次執行此腳本。")
