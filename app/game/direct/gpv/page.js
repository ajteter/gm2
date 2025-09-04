import { redirect } from 'next/navigation';
import gpverticalGames from '../../../lib/gpvertical.json';

export const dynamic = 'force-dynamic';

function getDailyGame() {
    // 获取当前日期作为种子
    const today = new Date();
    const dateString = today.getFullYear() + '-' + 
                      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(today.getDate()).padStart(2, '0');
    
    // 使用日期字符串生成种子
    let seed = 0;
    for (let i = 0; i < dateString.length; i++) {
        seed = ((seed << 5) - seed) + dateString.charCodeAt(i);
        seed = seed & seed; // 转换为32位整数
    }
    
    // 使用种子选择游戏
    const gameIndex = Math.abs(seed) % gpverticalGames.length;
    return gpverticalGames[gameIndex];
}

export default function DirectGpvPage() {
    const game = getDailyGame();
    
    if (!game || !game.url) {
        redirect('/game');
    }
    
    redirect(game.url);
}
