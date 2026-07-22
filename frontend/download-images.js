const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, 'public', 'images');

// Ensure directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const assets = [
  {
    name: 'logo.png',
    url: 'https://lh3.googleusercontent.com/aida/AP1WRLuTD1c211xdQOlarLHEb1x_esX270AnENoZBT9tcb6LiBg9oSNjokRPxeU3RK1DHCx6x6Vo-UaSch2BqeqKR_3nblSuNq3fq98Qw21CPVMRz0SeKhv8Y4-eYcKquZQs5KH9g03qliAWTS4AQCjmi-Slldn61D2W1fsb0qm2ev9eZALtGTGslV1VkcjEn3D8Exdyndt0IMibj7ZBFSnpaKk_Kt7NNtZjtEA-dRCH36VFv4TnYswcJ_SqFw'
  },
  {
    name: 'hero-brain.png',
    url: 'https://lh3.googleusercontent.com/aida/AP1WRLurmSlh27vhRu_Gqlc9epSgrbD8jejDRPvmZNImOqnlCgsZdsbo7U6XAjdZyjq66iBvQPvscWenyK9ELo1XlxhTOrzexlG0y8j_pQ-HKZXbHkS-BbXsFvr8BY29Q7EJKh3am1Jkop-rQOrRTWtjq1NhNOHgxSdwbPjEQ_-M6Je9im2gfAeRZViwgyQDY12CPurncWpetvpuYlPU53PsaRF56kasVtqahFHCaDwPzZ0QuDvmpGZ4ayPxng'
  },
  {
    name: 'auth-illustration.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8zYOMtj_jhNh-hoeUr2yA9-3-XqdaFt92GLLPAS8GdP8Sq8t3Sboz7gaFOOBZSvdhloTxeY4rPZlchW9BAYrzHmcV04gTuo0sqYfjIPlrXETuXNejhVhO5AZoeWdhmEPr_Wr98WbitzCdignD15pJ_vWSvx_lLzMbG7ZX3DGuQjH_sYB9MSMyr0zuYC78xsq6r2VDy5MCR0sqEOCvnzZziiQYhZhoK5Rjo6RDSS6eQ2ENBzE26QyxKyDtGBaXhtu254hfBGpKyEs'
  },
  {
    name: 'user-avatar.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOVXJNOjZuA5KF6bwUgI507jEnyuYTHlZASQVVN1Ip6QqWi9z77jPHFpmAQiXOaVv5YiFN8kzt6MZk55pycruJqwKKPs8rqw_adPgTT95UCMs7AaFLXX4lIpjUNmZrE_I8WJN6x0uZi4tgPJkGO5DyUNT7a7_1zwT_l11bFHt3zURzPHJZVxOnRWWjpX_hW6EOaOaXX9ome2_quq6SXYQ8EGAncW5vY09ng0gVFlYR8tp7Rvt0meySWNniAnhGHwDK6_mCaqh0jLg'
  },
  {
    name: 'user-avatar-2.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxkap1pc8zy6snRViPTRKobJ1jJScGdWq4pK39iuUIgupn_iQWFRQNadwjBqcqaZLE6NGq3qUNSdjQCyWXfnfunSz2xRdueQ6XpwsLuQUjofvEZbyQ2IlA3sRTybSFpnBJaNkLtWEGcUnWV0_cKDbPPxZb8CjTPP7BVnkuAKy0d2FVw94EiE6NBOzj9tuveSWX1bDoa_jYasxwl19tHvkmF1YOxA_zSP9MoxUFHUsPjGfbDrtclw9sYfwOUdUx2LcS0uoR7l2sU-g'
  },
  {
    name: 'graph-network.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBNK24_0feci1icr5GUsMRrAIIxGnCUntC8K7EV3wQr5nown5tFlVrdaKivPgYflLlunTU2izBB1EOaIRcSyv0yKJSRAK3v_OpZHWz0MpJzcCOsVR0Pl7idtT6rRj4cCwzhdgoeO12N1WCbeqC26iiQQMbumMyXYdCpdlY6KoSNR2n5iS2c890H52sh2TPZHb--YHTuwFm6xIskNBvt6dyX3xcgvifMxDdl_tjQc4xkUHnRGBgG2KIBQS3KKy_rd4FuFsGcen1qU8'
  },
  {
    name: 'rain-water.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApUz60VWAyQHkFQkA8BorUNJdcziSRE_yvwf7-MJ2L2-t-ErwOhkUuD7pqTDq9GXqH1_7ooeWUFgiD_E5gL1avLWHCobB0HWcSAljRjjYh6swBN5aTjDeqBI27a3fgHRBQLd83DBx2sXSdUbgAK7eEkiY3QzjEnrAH8_RA4GKjcBJ5aBnblQeKooBx_8NAjW_OXxRUX_21R5iroP9L2rMkV1TsCQmewpbDMuQyBQ-_6aisFIXfYTFpmgPWV17I47WvP4pcWo3d81Y'
  },
  {
    name: 'alex-rivera.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7dlxVSmZ0Iih2sBQtFyoE6N4sh2nB8BcvPTOpYavppfuRU__Y6-535sio9vIvbrgxgUKVn9bQwtAXwHcClOcZD2qK7mLmTKfRYYvuwK4ZmQBWyO5kZv66LQpLg52rF0QJH1EYh3carOs1DeeHtX-EuGhvska3VhTYuDAY2mql8N0PCtHRO1yqPe3nahFoxQcpuHBe4REFCaO71KAPuAKeHqzn6iUYvgTvzpufqAU4GyodqILGNvE2dDhbEyqStkocHv_w58B_oj4'
  },
  // Company logos
  {
    name: 'google.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiNrh42Ax6pb3btLEur7JCmLaQX00RzJVaZl6Izlo5tiDJT8H3iIYLfO5Cz9jF0rcF8O7tWH2idfZuH6z5jQDlFLl6QX3aABzJkbBPrDKIl_8oJL6P6I4LK-au8eDVOz1FWI8glYiVzeANknrh3dsl95jikIvw9L39dc0KlChQUH2yIP288D7Geug4UitamusfY65sDHoimLi9hwcOWu-aJIbF1mX7fnRzTiSCv3YE9A4WediaNuqhokFZ5RIsGFYwd4Zrb-gWNYE'
  },
  {
    name: 'amazon.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZeeDkSEnzoqjaQ2-5OTJORr79mIAJ_zQuGQW9h4Jq7pVkx3KEJ2VbSn7pcqCFnDBZTAhGBUuiI3whsA1pRyMgAnYgAGszesLXOo_w7mApsQfme6Ay64T1p1nL81y1QCSPrLd2rZh87Z0rrpUFWVs2lAUyHGxYWjvuxkPUsL9GxBAgwDvWe--g7s0wB_PGEnOkMPCm7p6sOKYsiNjdOP2JIw3NLPr-AMrsnnQyoA016ibR__ZXjtW3YQq0sSuhmXfcRA_KI-Qoytc'
  },
  {
    name: 'microsoft.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2fLt0EzepH_ynsPkWDsf4l75xqytgriRXe-migkzPBjA4dM_7iCZEYFPPs_gQPne1RQz1Ign7Oa2J7KQ2N1cN75_TXuHqH7evbPnvwXNK_T2LgQRFC83LAqvucuuqdMRr1VHrw86nlLaKqg3rRwDjaTOIKuct37fMZTfX85En1lWmozV6xzQ_qrlFuDnwPwV1mteFFobtW1GGcokzMQKRorQIkwPr3n2TK6qorG6vFlOs2r1F1h_LfLOPKBcfb8wqXEgHPSjssto'
  },
  {
    name: 'meta.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxTI29XWMfALJ0b4ih_yWPlslwtLBjeP3-r-bXk2MjutOSkqU0niIwESs2xetYmK6uFsi9gIxd6PD_WMQQu019_RD_ggSWp5X3_g5drq7BFxFMILgQGPX8zTLAHSBr_HuxTtsvqNLzYlXtnbxLAos7SXAGZRS-atjckUe7TDJBglfTTG7FgWQr8oX0byu_6zRGWtzcWVrcnuJYLqsvyHT3sYjme78OmKrpKlNhPdRD2sB7MIWFApVVusXxSUUAR7OMQnSEIVR_Rc0'
  },
  {
    name: 'adobe.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ1HLjth92y1M2JNCGxmJmmKtMTjrdqJt9ua6Q7klYI9Of6uOkh4WZ7_MXonGPyrZRVrZlq9de7m5MoSVBKAPLy2mSg7PckIw_6TCo4qONdv7ZiS6jfrki9H7ftHZSqSBmRPztpQdK003Ncvbl6fjeXCnyTs_Dnhdn4BPas2Di4-pRKf4Q6F7pyrYjgbQw5cC6kLwSVBYQd7Tc9b3sQDqx3VtpJYgusBU065G_vsMLN5sVHDaIttw5OhRBVm8C_uubUzaMd-0D0Sg'
  },
  {
    name: 'apple.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfntuWvEZlBNaycB3PpTYIOdFHJVV1fpcJPlFV-zxTEokOzVRjF8iPo2KZ6-lRvUg_0zc7ibmdyuYTv23f5JazVESYPNubBALWhKAzN40DmsVUl7Y-0fgj7O7aowCWBlW52NKW8ZRy4ivIASFxpsxhbSLnbDfwXY1-y4JJLNwqpr7-P3HxTdDjwJrCYSUPtV5QRfkYdi1jcD0z9CmKetHte_VW37XFiAW7l1HGRrwiGw-idGSO8ED3R8aquq4auI3Tte64ETLyxKg'
  },
  {
    name: 'netflix.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMA9m0AqaF5DO2S7NKhngEEJG5gmUelGufe3lxoc1046_4GILlWT7Rlx3yWeJVbUEnhaepJ2g_AOvtSCvYMB0cMB7uTtfEvM0Ksg2I4lKzOXQELoleUJLlKWOhOuxTaBD_aCzUCLEUa_tRNBg_pUmuZZ0F4_x1OtIwy0vRpvb4eVAhIeDN7hMYfy-waA0tqeRFjd1pNf5W0lK1tuoOe48I64sfL2l9M2sDnPy211Hwv2vz6sOynGf3o6N7SHCOXPTXuuBl-ANxCy8'
  },
  {
    name: 'stripe.png',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9XLpSrgSrWhsdSXQxc2xbducn8E0P3s9VgWcEGxIeR_zRPe3d6x9gI0BsGCJ2SgBrrosoFuhU_NGz669HRL3Pu6DIgGsDdQ6v8kUy9bJ0mK9Nc88Dk0bmZmlnt5rG9FwO3IGAbxdc7kVS_yQPFo_cMnGhTwM1PH58Yp_Bt0kDLU0sLcv4ij0idIJC16ShAXBT_Kkz4VwwTwyxLrMsLm9U8h0CRh-bxZc2otsZiGquOnFi3BxE-ec0VfTH28Zwzx4Suroqv581T20'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log(`Starting download of ${assets.length} image assets...`);
  for (const asset of assets) {
    const destPath = path.join(IMAGES_DIR, asset.name);
    console.log(`Downloading ${asset.name} from ${asset.url}...`);
    try {
      await download(asset.url, destPath);
      console.log(`Successfully downloaded ${asset.name}`);
    } catch (err) {
      console.error(`Error downloading ${asset.name}:`, err.message);
    }
  }
  console.log('All image assets download completed.');
}

main();
