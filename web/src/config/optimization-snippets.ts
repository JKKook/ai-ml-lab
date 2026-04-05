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
