import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';  
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  events: any[];
  
  constructor(
    public eventService: EventService,
     private router: Router,
    private loadingController: LoadingController,
    private platform: Platform) {
    this.events = this.eventService.getEvents();
  }
  

  ngAfterViewInit() {
  }
  
  navigateToStreaming() {
    this.router.navigate(['./tabs/streaming']);
  }

  // Captura el elemento html lo convierte a un "canvas" y genera una imagen
  captureScreen() {
    
    const doc = new jsPDF();
    doc.text('Holi',10,10);
    
    var img = new Image()
    img.src = 'assets/ticket-sample.png'
    doc.addImage(img, 'png', 2, 5, 205, 80)//210 es full anchura
    doc.save('hello.pdf');




    // let data = document.getElementById('contentToConvert');
    // html2canvas(data as any).then(canvas => {
    //     var imgWidth = 210;
    //     var pageHeight = 295;
    //     var imgHeight = canvas.height * imgWidth / canvas.width;
    //     var heightLeft = imgHeight;
    //     const contentDataURL = canvas.toDataURL('image/png');
    //     let pdfData = new jsPDF('p', 'mm', 'a4');
    //     var position = 0;
    //     pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    //     pdfData.save(`MyPdf.pdf`);
    // });

    // const elemento = document.getElementById('cartaEvento') as HTMLElement;
    // html2canvas(elemento).then((canvas: HTMLCanvasElement) => {

    //   this.downloadImage(canvas);
    //   if (this.platform.is('capacitor')) this.shareImage(canvas);
    //   else this.downloadImage(canvas);

    // })

  }

  // Descargar la imagen para web
  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();

  }

  // Compartir la imagen para movil
  async shareImage(canvas: HTMLCanvasElement) {

    let base64 = canvas.toDataURL();
    let path = 'qr.png';

    const loading = await this.loadingController.create({
      spinner: 'bubbles'
    });
    await loading.present();

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
    }).then(async (res) => {

      let uri = res.uri;

      await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: uri,
        dialogTitle: 'Share with buddies',
      });

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      })
    }).finally(() => { loading.dismiss(); })
  }

  onClick() {
    
    this.captureScreen();










    /*
    const postData = {
      idEvento: 2,
      idCuenta: 1,
      cantidad: 3,
      zona: "BLANCA"
    };
    const headers = {
      'Content-Type': 'application/json'
    };

    axios.post('http://localhost:9000/entrada', postData, {
      headers: headers,
      responseType: 'blob'  // Importante para recibir archivos
    })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'entrada.pdf';  // Define aquí el nombre de archivo deseado
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);  // Elimina el enlace después de descargar
        window.URL.revokeObjectURL(url);  // Libera la URL del objeto
      })
      .catch(error => {
        console.error('Error al descargar el PDF:', error);
      });*/
  }




}
