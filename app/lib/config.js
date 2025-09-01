// 应用配置常量
export const CONFIG = {
    // 分页配置
    PAGE_SIZE: 50,
    
    // 缓存配置 (秒)
    CACHE_DURATION: 600, // 10分钟
    STALE_WHILE_REVALIDATE: 1800, // 30分钟
    
    // 广告配置
    ADS: {
        BANNER: {
            key: 'fcc762bb57d3b98bebe1d12335e8d590',
            format: 'iframe',
            height: 90,
            maxWidth: 728
        }
    },
    
    // 随机游戏缓存时间 (毫秒)
    RANDOM_GAME_CACHE_DURATION: 15 * 60 * 1000 // 15分钟
};
