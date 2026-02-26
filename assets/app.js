const { useState } = React;

const compareData = {
  tcp: {
    title: "TCP（追跡番号つきの丁寧な配送）",
    points: [
      "順番どおりに必ず届ける",
      "届かなければ再配達（再送）",
      "混雑すると速度調整",
    ],
    metaphor: "追跡番号つきで、届くまで配達員が確認する宅配便",
  },
  udp: {
    title: "UDP（手早いが確認しない配送）",
    points: [
      "速いが順番は保証しない",
      "届いた分だけ使う",
      "遅延が少ない",
    ],
    metaphor: "ポスト投函のチラシ配り。速いが届いた確認はしない",
  },
};

const exchangeData = {
  circuit: {
    title: "回線交換（専用の配達員が同行）",
    points: [
      "最初に道を確保してから運ぶ",
      "混雑しても同じ道で進む",
      "安定だが準備に時間",
    ],
    metaphor: "専用の配達員が、出発から到着までずっと担当する",
  },
  packet: {
    title: "パケット交換（小包を分けて配送）",
    points: [
      "小包に分けて別ルートで運ぶ",
      "混雑に応じて道を変える",
      "効率は良いが順番が乱れることがある",
    ],
    metaphor: "荷物を小分けし、空いている道を使い分ける配送",
  },
};

function App() {
  const [transportMode, setTransportMode] = useState("tcp");
  const [exchangeMode, setExchangeMode] = useState("packet");
  const [congestion, setCongestion] = useState(40);

  const speed = Math.max(1.8, 6 - congestion / 20); // 1.8s - 6s
  const loss = Math.min(0.6, congestion / 140);

  const transport = compareData[transportMode];
  const exchange = exchangeData[exchangeMode];

  return (
    <div className="page">
      <section className="hero">
        <span className="badge">情報I：TCP/IP 体験教材</span>
        <h1>TCP/IPは「情報の郵便配達ルール」</h1>
        <p>
          住所（IP）と追跡（TCP）で、分割した手紙（パケット）を確実に届ける。
          比喩で感覚的に理解しよう。
        </p>
      </section>

      <section className="section">
        <h2>プロトコルとは？</h2>
        <div className="grid two">
          <div>
            <p>
              みんなが守る「決まりごと」。郵便で言えば、宛名の書き方や封筒のサイズ、
              配達の順番などがプロトコル。
            </p>
            <ul className="list">
              <li>宛名の書き方 = 住所（IP）</li>
              <li>追跡番号 = 受け取り確認（TCP）</li>
              <li>配送の手順 = 通信のルール</li>
            </ul>
          </div>
          <div className="compare-card">
            <h3>比喩</h3>
            <p>
              「誰に・どの順番で・どう届けるか」を決めるのがプロトコル。守らないと届かない。
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>TCP/IPの簡単な説明</h2>
        <div className="cta" style={{ marginBottom: "16px" }}>
          <button
            className={`btn ${transportMode === "tcp" ? "active" : ""}`}
            onClick={() => setTransportMode("tcp")}
          >
            TCPを表示
          </button>
          <button
            className={`btn ${transportMode === "udp" ? "active" : ""}`}
            onClick={() => setTransportMode("udp")}
          >
            UDPを表示
          </button>
        </div>
        <div className="grid two">
          <div className="compare-card">
            <h3>IP = 住所</h3>
            <p>どこへ届けるかを決める。宛先がなければ配達できない。</p>
          </div>
          <div className="compare-card">
            <h3>TCP = 追跡と再配達</h3>
            <p>届かなければもう一度送る。順番も整える。</p>
          </div>
        </div>
        <div className="compare-card" style={{ marginTop: "12px" }}>
          <h3>{transport.title}</h3>
          <p>{transport.metaphor}</p>
          <ul className="list">
            {transport.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>交換方式（体験型）</h2>
        <div className="cta" style={{ marginBottom: "16px" }}>
          <button
            className={`btn ${exchangeMode === "circuit" ? "active" : ""}`}
            onClick={() => setExchangeMode("circuit")}
          >
            回線交換
          </button>
          <button
            className={`btn ${exchangeMode === "packet" ? "active" : ""}`}
            onClick={() => setExchangeMode("packet")}
          >
            パケット交換
          </button>
        </div>
        <div className="grid two">
          <div>
            <div className="compare-card">
              <h3>{exchange.title}</h3>
              <p>{exchange.metaphor}</p>
              <ul className="list">
                {exchange.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="slider-row" style={{ marginTop: "12px" }}>
              <label>
                混雑度: <strong>{congestion}</strong>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={congestion}
                onChange={(e) => setCongestion(Number(e.target.value))}
              />
              <div className="loss">損失率: {(loss * 100).toFixed(0)}%</div>
            </div>
          </div>
          <div className="simulation">
            <p>配送アニメーション（混雑度で速度と損失が変化）</p>
            {exchangeMode === "circuit" ? (
              <div className="track" style={{ "--speed": `${speed}s`, "--loss": loss }}>
                <div style={{ position: "relative", height: "100%" }}>
                  <div style={{ position: "absolute", left: 0, top: "10%", right: 0, fontSize: "0.8rem", color: "#94a3b8", padding: "0 8px" }}>
                    専用ルート（1本道）
                  </div>
                  <div className="packet p1 animate" style={{ top: "16px" }}>
                    1
                  </div>
                  <div
                    className="packet p2 animate"
                    style={{ top: "40px", animationDelay: "0.6s" }}
                  >
                    2
                  </div>
                </div>
              </div>
            ) : (
              <div className="track multi-route" style={{ "--speed": `${speed}s`, "--loss": loss }}>
                <div style={{ position: "absolute", left: 0, top: "4px", fontSize: "0.75rem", color: "#94a3b8", zIndex: 10 }}>
                  複数ルート（分割配送）
                </div>
                <div className="route">
                  <div
                    className="packet p1 animate-top"
                    style={{ top: "20px", width: "24px", height: "24px" }}
                  >
                    1a
                  </div>
                  <div
                    className="packet p2 animate-top"
                    style={{
                      top: "20px",
                      animationDelay: "0.6s",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    2a
                  </div>
                </div>
                <div className="route">
                  <div
                    className="packet p1 animate-bottom"
                    style={{ top: "20px", width: "24px", height: "24px" }}
                  >
                    1b
                  </div>
                  <div
                    className="packet p2 animate-bottom"
                    style={{
                      top: "20px",
                      animationDelay: "0.6s",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    2b
                  </div>
                  <div className="recombine">✓</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <h2>TCP/IPの4層モデル（郵便の対応）</h2>
        <div className="layer-table">
          <div className="layer-row">
            <strong>アプリケーション層</strong>：手紙の内容（何を伝えるか）
          </div>
          <div className="layer-row">
            <strong>トランスポート層</strong>：追跡・再送（TCP/UDP）
          </div>
          <div className="layer-row">
            <strong>インターネット層</strong>：住所（IP）
          </div>
          <div className="layer-row">
            <strong>ネットワークインタフェース層</strong>：運搬手段（トラック・道路）
          </div>
        </div>
      </section>

      <footer className="footer">© 2026 TCP/IP 体験教材</footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
