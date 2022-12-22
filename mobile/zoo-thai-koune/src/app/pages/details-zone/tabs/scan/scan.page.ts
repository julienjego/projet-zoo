import { Toasts } from 'src/app/utils/toasts';
import { Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  html5QrcodeScanner!: Html5Qrcode;

  constructor(private router: Router, private toast: Toasts) {}

  ngOnInit() {}

  startScan() {
    this.html5QrcodeScanner = new Html5Qrcode('reader');
    this.html5QrcodeScanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 300, height: 300 } },
      this.onSuccess,
      this.onFail
    );
  }

  onSuccess = (decodedText: string) => {
    this.html5QrcodeScanner.stop();
    this.router.navigate([decodedText]).catch(() => {
      this.toast.presentToast('Aucun animal trouvé !');
    });
  };

  onFail = () => {
    console.warn('no match');
  };

  ionViewWillLeave() {
    this.html5QrcodeScanner.stop();
  }
}
