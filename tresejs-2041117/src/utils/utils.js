export const geshi_time = (originalTime) => {
    // 原始时间字符串
    // const originalTime = "2024-12-04T17:07:55";
    // 将时间字符串转换为Date对象
    const date = new Date(originalTime);
    // 获取年、月、日、时、分、秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // 格式化后的时间字符串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}