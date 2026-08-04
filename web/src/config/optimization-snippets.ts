/** PyTorch 예제 — 브라우저 데모와 같은 Rosenbrock + 옵티마이저 (로컬/Colab에서 실행) */

export const SNIPPET_TORCH_ROSENBROCK_DEF = `import torch

# f(x,y) = (1-x)^2 + 100*(y-x^2)^2  — 최솟값 (1, 1)
def rosenbrock(xy: torch.Tensor) -> torch.Tensor:
    x, y = xy[0], xy[1]
    return (1 - x) ** 2 + 100 * (y - x ** 2) ** 2

# 2차원 파라미터 (웹 데모와 동일한 초기값)
xy = torch.tensor([-1.2, 1.0], requires_grad=True)`;

export const SNIPPET_TORCH_SGD = `${SNIPPET_TORCH_ROSENBROCK_DEF}

opt = torch.optim.SGD([xy], lr=1.5e-4)

for step in range(600):
    opt.zero_grad()
    loss = rosenbrock(xy)
    loss.backward()
    opt.step()
    if step % 100 == 0:
        print(step, float(loss), xy.detach().tolist())`;

export const SNIPPET_TORCH_MOMENTUM = `${SNIPPET_TORCH_ROSENBROCK_DEF}

opt = torch.optim.SGD([xy], lr=1.5e-4, momentum=0.9)

for step in range(600):
    opt.zero_grad()
    loss = rosenbrock(xy)
    loss.backward()
    opt.step()
    if step % 100 == 0:
        print(step, float(loss), xy.detach().tolist())`;

export const SNIPPET_TORCH_RMSPROP = `${SNIPPET_TORCH_ROSENBROCK_DEF}

opt = torch.optim.RMSprop([xy], lr=1e-3, alpha=0.99, eps=1e-8)

for step in range(600):
    opt.zero_grad()
    loss = rosenbrock(xy)
    loss.backward()
    opt.step()
    if step % 100 == 0:
        print(step, float(loss), xy.detach().tolist())`;

export const SNIPPET_TORCH_ADAM = `${SNIPPET_TORCH_ROSENBROCK_DEF}

opt = torch.optim.Adam([xy], lr=0.02, betas=(0.9, 0.999), eps=1e-8)

for step in range(600):
    opt.zero_grad()
    loss = rosenbrock(xy)
    loss.backward()
    opt.step()
    if step % 100 == 0:
        print(step, float(loss), xy.detach().tolist())`;

export const SNIPPET_TORCH_ADAMW_NOTE = `import torch

# AdamW: 가중치 감쇠(weight decay)를 손실 그래디언트와 섞지 않고 옵티마이저에서 분리
# nn.Linear 등 모듈 파라미터에 주로 사용. 2D Rosenbrock 데모와는 별개로 참고용입니다.

model = torch.nn.Linear(4, 1)
opt = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)

loss_fn = torch.nn.MSELoss()
# ... 순전파 → loss → loss.backward() → opt.step()`;

export const SNIPPET_TORCH_CNN = `import torch
import torch.nn as nn

# 웹 데모와 같은 과제: 8x8 이미지 3클래스(세로선/가로선/대각선) 분류
def make_batch(n: int):
    imgs = torch.rand(n, 1, 8, 8) * 0.2          # 배경 노이즈
    labels = torch.randint(0, 3, (n,))
    for i, cls in enumerate(labels):
        pos = torch.randint(1, 7, (1,)).item()
        if cls == 0:   imgs[i, 0, :, pos] = 0.75 + torch.rand(8) * 0.25  # 세로선
        elif cls == 1: imgs[i, 0, pos, :] = 0.75 + torch.rand(8) * 0.25  # 가로선
        else:                                                             # 대각선
            off = torch.randint(-2, 3, (1,)).item()
            for r in range(8):
                if 0 <= r + off < 8:
                    imgs[i, 0, r, r + off] = 0.75 + torch.rand(1).item() * 0.25
    return imgs, labels

# 웹 데모와 같은 미니 CNN: Conv(1→4, 3x3) → ReLU → MaxPool(2) → FC(36→3)
model = nn.Sequential(
    nn.Conv2d(1, 4, kernel_size=3),   # 8x8 → 6x6
    nn.ReLU(),
    nn.MaxPool2d(2),                  # 6x6 → 3x3
    nn.Flatten(),                     # 4*3*3 = 36
    nn.Linear(36, 3),
)

# 옵티마이저를 바꿔 가며 곡선을 비교해 보세요
opt = torch.optim.Adam(model.parameters(), lr=1e-2)
# opt = torch.optim.SGD(model.parameters(), lr=0.1)
# opt = torch.optim.SGD(model.parameters(), lr=0.02, momentum=0.9)
# opt = torch.optim.RMSprop(model.parameters(), lr=5e-3)
loss_fn = nn.CrossEntropyLoss()

for step in range(360):
    imgs, labels = make_batch(16)
    opt.zero_grad()
    loss = loss_fn(model(imgs), labels)
    loss.backward()
    opt.step()
    if step % 60 == 0:
        with torch.no_grad():
            ti, tl = make_batch(200)
            acc = (model(ti).argmax(1) == tl).float().mean().item()
        print(f"step {step:4d}  loss {loss.item():.4f}  acc {acc:.2%}")`;
