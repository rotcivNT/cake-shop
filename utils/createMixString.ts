export function createMixedString(productName: string): string {
    // Loại bỏ các ký tự đặc biệt và chuyển đổi thành chữ hoa
  const cleanName = productName.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
  
  // Tách thành các từ và lấy ký tự đầu tiên của mỗi từ
  const initials = cleanName.split(' ').map(word => word.charAt(0));
  
  // Kết hợp các ký tự đầu, tối đa 3 ký tự
  let code = initials.join('').slice(0, 3);
  
  // Thêm các ký tự ngẫu nhiên cho đủ 5 ký tự
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  while (code.length < 5) {
    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
    code += randomChar;
  }
  
  return code;
  }