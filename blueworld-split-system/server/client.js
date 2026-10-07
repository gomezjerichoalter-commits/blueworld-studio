const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const BASE_URL = 'http://localhost:5000/api';
const userId = 'test_user';

async function menu() {
    console.clear();
    console.log('==================================================');
    console.log('     blueWORLD.NWO TERMINAL SUPER-APP STUDIO      ');
    console.log('==================================================');
    console.log(' [1] Check Credits & Wallet Balance');
    console.log(' [2] Run Autonomous AI Agent Task');
    console.log(' [3] View Scratchpad Notes');
    console.log(' [4] View Notification Hub');
    console.log(' [5] Run Fraud & Risk Security Check');
    console.log(' [6] Test Edge-Cache CDN Router');
    console.log(' [7] Exit Terminal Dashboard');
    console.log('--------------------------------------------------');

    rl.question('\nSelect action [1-7]: ', async (ans) => {
        switch(ans.trim()) {
            case '1':
                try {
                    const res = await fetch(`${BASE_URL}/credits/${userId}`);
                    const data = await res.json();
                    console.log('\n[WALLET CREDITS]:', data);
                } catch(err) { console.log('Error:', err.message); }
                break;
            case '2':
                rl.question('Enter AI Agent Prompt (e.g. TikTok Viral Script): ', async (prompt) => {
                    try {
                        const res = await fetch(`${BASE_URL}/agents/task`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ user_id: userId, agent_type: 'Video Script Bot', prompt })
                        });
                        const data = await res.json();
                        console.log('\n[AGENT TASK RESULT]:', data);
                    } catch(err) { console.log('Error:', err.message); }
                    setTimeout(menu, 3500);
                });
                return;
            case '3':
                try {
                    const res = await fetch(`${BASE_URL}/notes/${userId}`);
                    const data = await res.json();
                    console.log('\n[SAVED NOTES]:', data);
                } catch(err) { console.log('Error:', err.message); }
                break;
            case '4':
                try {
                    const res = await fetch(`${BASE_URL}/notifications/${userId}`);
                    const data = await res.json();
                    console.log('\n[NOTIFICATION HUB]:', data);
                } catch(err) { console.log('Error:', err.message); }
                break;
            case '5':
                try {
                    const res = await fetch(`${BASE_URL}/security/evaluate`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_id: userId, transaction_amount: 1500, velocity_count: 6 })
                    });
                    const data = await res.json();
                    console.log('\n[SECURITY EVALUATION]:', data);
                } catch(err) { console.log('Error:', err.message); }
                break;
            case '6':
                try {
                    const res = await fetch(`${BASE_URL}/edge/cache`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ asset_key: 'terminal_reel.mp4', region: 'Africa-Central', payload: 'https://cdn.blueworld.nwo/reel' })
                    });
                    const data = await res.json();
                    console.log('\n[EDGE CACHE RESULT]:', data);
                } catch(err) { console.log('Error:', err.message); }
                break;
            case '7':
                console.log('Exiting Terminal Dashboard. Goodbye!');
                rl.close();
                return;
            default:
                console.log('Invalid option.');
        }
        setTimeout(menu, 3000);
    });
}

menu();
