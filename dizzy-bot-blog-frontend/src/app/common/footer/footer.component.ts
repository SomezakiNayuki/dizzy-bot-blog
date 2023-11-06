import { Component } from "@angular/core";

@Component({
  selector: 'dzb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  // screen contents
  protected userName: string = 'Dizzy Bot';
  protected userDescription: string = 'The strongest Artificial Idiot in the world';
  protected userWechatId: string = 'wechat: SomezakiNayuki';
  protected userEmail: string = 'Email: 123456789@gmail.com';
  protected userContactQRCode: string = '../../assets/images/wechat-QR-code.jpg';

}
