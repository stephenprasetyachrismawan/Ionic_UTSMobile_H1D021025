import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
})
export class TransaksiPage implements OnInit {
  dataTransaksi: any;
  constructor(public _apiService: ApiService, private modal: ModalController) {}
  modal_tambah = false;
  modal_edit = false;
  id: any;
  uraian: any;
  jumlah: any;

  ngOnInit() {
    this.getTransaksi();
  }
  getTransaksi() {
    this._apiService.tampil('tampildata.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataTransaksi = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  reset_model() {
    this.id = null;
    this.uraian = '';
    this.jumlah = '';
  }
  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }
  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilTransaksi(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }
  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }
  tambahTransaksi() {
    if (this.uraian != '' && this.jumlah != '') {
      let data = {
        uraian: this.uraian,
        jumlah: this.jumlah,
      };
      this._apiService.tambah(data, '/tambahdata.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah transaksi');
          this.getTransaksi();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah transaksi');
        },
      });
    } else {
      console.log('gagal tambah transaksi karena masih ada data yg kosong');
    }
  }
  hapusTransaksi(id: any) {
    this._apiService.hapus(id, '/delete.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getTransaksi();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }
  ambilTransaksi(id: any) {
    this._apiService.lihat(id, 'tampilid.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let transaksi = hasil;
        this.id = transaksi.id;
        this.uraian = transaksi.uraian;
        this.jumlah = transaksi.jumlah;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }
  editTransaksi() {
    let data = {
      id: this.id,
      uraian: this.uraian,
      jumlah: this.jumlah,
    };
    this._apiService.edit(data, '/editid.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getTransaksi();
        console.log('berhasil edit Transaksi');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Transaksi');
      },
    });
  }
}
