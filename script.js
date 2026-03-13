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