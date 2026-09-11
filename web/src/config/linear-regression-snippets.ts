/** 브라우저 데모와 같은 데이터·같은 절차를 파이썬으로 옮긴 예제 */

export const SNIPPET_PANDAS_LOAD = `import pandas as pd

df = pd.read_csv("salary.csv")   # YearsExperience, Salary 두 열 — 아래 예측 표와 같은 30행
x = df["YearsExperience"].to_numpy()
y = df["Salary"].to_numpy()

print(df.describe())`;

export const SNIPPET_SKLEARN_FIT = `from sklearn.linear_model import LinearRegression

model = LinearRegression().fit(x.reshape(-1, 1), y)

print("slope    :", model.coef_[0])      # 경력 1년당 연봉 증가폭
print("intercept:", model.intercept_)    # 경력 0년일 때의 추정 연봉
print("R^2      :", model.score(x.reshape(-1, 1), y))`;

export const SNIPPET_NUMPY_GRADIENT_DESCENT = `import numpy as np

# 원 스케일(연봉 4만~12만)에서 바로 경사하강을 돌리면 발산한다.
# 웹 데모와 동일하게 z-score로 표준화한 뒤 학습한다.
mx, sx = x.mean(), x.std()
my, sy = y.mean(), y.std()
xz, yz = (x - mx) / sx, (y - my) / sy

w = b = 0.0
lr, steps = 0.05, 300

for step in range(steps):
    pred = w * xz + b
    err = pred - yz
    loss = (err ** 2).mean()

    w -= lr * 2 * (err * xz).mean()
    b -= lr * 2 * err.mean()

    if step % 50 == 0:
        print(step, loss)

# 표준화 공간의 w, b를 원 단위 계수로 되돌린다
slope = w * sy / sx
intercept = my + b * sy - slope * mx
print("slope:", slope, "intercept:", intercept)`;

export const SNIPPET_CLOSED_FORM = `# 최소 제곱 해석해 — 단순 선형 회귀는 반복 없이 한 번에 풀린다
slope = ((x - x.mean()) * (y - y.mean())).sum() / ((x - x.mean()) ** 2).sum()
intercept = y.mean() - slope * x.mean()

pred = slope * x + intercept
rmse = np.sqrt(((y - pred) ** 2).mean())
r2 = 1 - ((y - pred) ** 2).sum() / ((y - y.mean()) ** 2).sum()

print(slope, intercept, rmse, r2)`;

export const SNIPPET_TORCH_LINEAR = `import torch
import torch.nn as nn

# 같은 문제를 딥러닝 프레임워크로: 입력 1 → 출력 1짜리 선형층 한 장
xt = torch.tensor(xz, dtype=torch.float32).unsqueeze(1)
yt = torch.tensor(yz, dtype=torch.float32).unsqueeze(1)

model = nn.Linear(1, 1)
opt = torch.optim.SGD(model.parameters(), lr=0.05)
loss_fn = nn.MSELoss()

for step in range(300):
    opt.zero_grad()
    loss = loss_fn(model(xt), yt)
    loss.backward()
    opt.step()

print(model.weight.item(), model.bias.item())`;
