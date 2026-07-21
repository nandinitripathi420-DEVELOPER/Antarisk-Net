import torch

from antarisk_net import ANTARISKNet

model = ANTARISKNet()

x = torch.randn(1, 3, 512, 512)

y = model(x)

print("Input Shape :", x.shape)
print("Output Shape:", y.shape)