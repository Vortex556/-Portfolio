const reader = document.getElementById('reader');
const readerTitle = document.getElementById('reader-title');
const readerBody = document.getElementById('reader-body');
const cursor = document.querySelector('.cursor');

// 1. 打字机效果
const titleText = "农洛儿 PORTFOLIO";
let i = 0;
function typeWriter() {
    if (i < titleText.length) {
        const hero = document.getElementById("hero-title");
        if(hero) hero.innerHTML += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
    }
}

// 2. 磁性光标逻辑
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 绑定所有可点击元素的磁性动效
document.querySelectorAll('.clickable, a, .close-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(6)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
});

// 3. 内容映射表
const contentMap = {
    "melt": typeof meltContent !== 'undefined' ? meltContent : null,
    "bailiu": typeof bailiuContent !== 'undefined' ? bailiuContent : null,
    "huaimu": typeof doorContent !== 'undefined' ? doorContent : null,
    "luye-2": typeof fireContent !== 'undefined' ? fireContent : null,
    "shulei": typeof mouseContent !== 'undefined' ? mouseContent : null,
    "liaoyuan": typeof peaceContent !== 'undefined' ? peaceContent : null,
    "luye-1": typeof wodiContent !== 'undefined' ? wodiContent : null,
    "nanyi": typeof summerContent !== 'undefined' ? summerContent : null,
    "seven": typeof sevenContent !== 'undefined' ? sevenContent : null
};

// 4. 点击加载内容逻辑
document.querySelectorAll('.clickable').forEach(item => {
    item.addEventListener('click', () => {
        const id = item.getAttribute('data-content');
        
        // 如果没有 data-content，说明它是外链，不触发弹窗逻辑
        if (!id) return;

        readerTitle.innerText = item.innerText.split(' ')[0];
        reader.classList.add('active');

        // 读取映射内容
        const content = contentMap[id];
        
        if (content) {
            // 保持分段逻辑
            readerBody.innerHTML = content.split('\n')
                .filter(line => line.trim() !== "")
                .map(line => `<p>${line.trim()}</p>`)
                .join('');
        } else {
            readerBody.innerHTML = `<p>抱歉，内容“${id}”尚未成功加载。请检查是否在 HTML 中引入了对应的 .js 文件。</p>`;
        }
    });
});

// 关闭弹窗
document.querySelector('.close-btn').addEventListener('click', () => reader.classList.remove('active'));

// 初始化
window.onload = typeWriter;

// --- BGM 全能控制逻辑 ---
const bgmPlayer = document.getElementById('bgm-player');
const bgmControl = document.getElementById('bgm-control');
const bgmIcon = document.getElementById('bgm-icon');
const musicNote = document.getElementById('music-note');
let isPlaying = false;
const targetVolume = 0.3;

// 渐入函数
function fadeIn() {
    bgmPlayer.volume = 0;
    bgmPlayer.play().then(() => {
        let vol = 0;
        const fadeTimer = setInterval(() => {
            if (vol < targetVolume) {
                vol += 0.02;
                bgmPlayer.volume = Math.min(vol, targetVolume);
            } else {
                clearInterval(fadeTimer);
            }
        }, 100);
        // 开启旋转
        musicNote.classList.add('music-rotating');
        bgmIcon.innerText = "SOUND ON";
        isPlaying = true;
    }).catch(error => {
        console.log("浏览器拦截了自动播放，等待用户交互");
    });
}

// 渐出函数
function fadeOut() {
    let vol = bgmPlayer.volume;
    const fadeTimer = setInterval(() => {
        if (vol > 0) {
            vol -= 0.02;
            bgmPlayer.volume = Math.max(vol, 0);
        } else {
            bgmPlayer.pause();
            clearInterval(fadeTimer);
            // 停止旋转
            musicNote.classList.remove('music-rotating');
            bgmIcon.innerText = "SOUND OFF";
            isPlaying = false;
        }
    }, 100);
}

// 手动开关点击
bgmControl.addEventListener('click', () => {
    if (isPlaying) {
        fadeOut();
    } else {
        fadeIn();
    }
});

// 核心：实现“一进去就响”的平替方案
// 当用户第一次点击页面、滚动或触摸时，立即触发渐入
const autoPlayHandler = () => {
    if (!isPlaying) {
        fadeIn();
    }
    // 触发一次后移除监听，防止重复触发
    document.removeEventListener('mousedown', autoPlayHandler);
    document.removeEventListener('scroll', autoPlayHandler);
    document.removeEventListener('touchstart', autoPlayHandler);
};

document.addEventListener('mousedown', autoPlayHandler);
document.addEventListener('scroll', autoPlayHandler);
document.addEventListener('touchstart', autoPlayHandler);