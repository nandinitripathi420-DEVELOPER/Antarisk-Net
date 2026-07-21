import torch
import torch.nn as nn


class ConvBlock(nn.Module):

    def __init__(self, in_channels, out_channels):
        super().__init__()

        self.block = nn.Sequential(

            nn.Conv2d(
                in_channels,
                out_channels,
                kernel_size=3,
                padding=1
            ),

            nn.BatchNorm2d(out_channels),

            nn.ReLU(),

            nn.Conv2d(
                out_channels,
                out_channels,
                kernel_size=3,
                padding=1
            ),

            nn.BatchNorm2d(out_channels),

            nn.ReLU()
        )

    def forward(self, x):
        return self.block(x)


class ANTARISKNet(nn.Module):

    def __init__(self):

        super().__init__()

        self.encoder = ConvBlock(3, 64)

        self.pool = nn.MaxPool2d(2)

        self.middle = ConvBlock(64, 128)

        self.up = nn.ConvTranspose2d(
            128,
            64,
            kernel_size=2,
            stride=2
        )

        self.decoder = ConvBlock(128, 64)

        self.final = nn.Conv2d(
            64,
            3,
            kernel_size=1
        )

    def forward(self, x):

        enc = self.encoder(x)

        pooled = self.pool(enc)

        mid = self.middle(pooled)

        up = self.up(mid)

        concat = torch.cat([up, enc], dim=1)

        dec = self.decoder(concat)

        out = self.final(dec)

        return out