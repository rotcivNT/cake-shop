export function createMixedString(productName: string): string {
  // Tách chuỗi đầu vào thành các từ
  const words = productName.split(" ");

  // Lấy ký tự đầu tiên của mỗi từ và nối lại
  const code = words.map((word) => word.charAt(0)).join("");

  return code;
}
