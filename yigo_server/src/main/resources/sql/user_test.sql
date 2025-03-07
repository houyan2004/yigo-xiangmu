-- 插入50条数据到user表
INSERT INTO user (sex, username, touxianimg, createtime, updatetime, status, openid, phone, password, money)
-- 使用循环来生成50条记录
WITH RECURSIVE num_seq (n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1
    FROM num_seq
    WHERE n < 500
)
SELECT
    -- 随机生成性别，这里简单用IF函数模拟，你可以替换更合理逻辑
    IF(MOD(n, 2) = 0, '男', '女') AS sex,
    -- 模拟生成用户名，这里简单用拼接字符串方式，你可以完善更合理逻辑
    CONCAT('用户', n+300) AS username,
    -- 简单给个默认的头像示例路径，你可按需改
    CONCAT('https://example.com/avatar/', n, '.png') AS touxianimg,
    -- 当前时间作为创建时间和更新时间示例，实际可按需调整
    NOW() AS createtime,
    NOW() AS updatetime,
    -- 随机生成用户状态，1或者2
    CASE WHEN MOD(n, 3) = 0 THEN 2 ELSE 1 END AS status,
    -- 简单模拟生成openid，实际按规则来
    CONCAT('openid_', n+300) AS openid,
    -- 这里沿用默认手机号示例，可改
    '18181035303' AS phone,
    -- 简单给个默认密码示例，按需调整
    CONCAT('pass', n+300) AS password,
    -- 随机给个金额示例，范围在0到1000，可改
    ROUND(RAND() * 1000, 2) AS money
FROM num_seq;