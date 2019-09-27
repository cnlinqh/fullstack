import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class Star extends StatelessWidget {
  final double _size = 14;
  final double _rate;
  Star(this._rate);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Container(
        width: ScreenUtil.getInstance().setWidth(70),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Icon(
              _rate >= 2
                  ? Icons.star
                  : _rate > 0 ? Icons.star_half : Icons.star_border,
              size: _size,
              color: _rate >= 2
                  ? Colors.orange
                  : _rate > 0 ? Colors.orangeAccent : Colors.black,
            ),
            Icon(
              _rate >= 4
                  ? Icons.star
                  : _rate > 2 ? Icons.star_half : Icons.star_border,
              size: _size,
              color: _rate >= 4
                  ? Colors.orange
                  : _rate > 2 ? Colors.orangeAccent : Colors.black,
            ),
            Icon(
              _rate >= 6
                  ? Icons.star
                  : _rate > 4 ? Icons.star_half : Icons.star_border,
              size: _size,
              color: _rate >= 6
                  ? Colors.orange
                  : _rate > 4 ? Colors.orangeAccent : Colors.black,
            ),
            Icon(
              _rate >= 8
                  ? Icons.star
                  : _rate > 6 ? Icons.star_half : Icons.star_border,
              size: _size,
              color: _rate >= 8
                  ? Colors.orange
                  : _rate > 6 ? Colors.orangeAccent : Colors.black,
            ),
            Icon(
              _rate >= 10
                  ? Icons.star
                  : _rate > 8 ? Icons.star_half : Icons.star_border,
              size: _size,
              color: _rate >= 10
                  ? Colors.orange
                  : _rate > 8 ? Colors.orangeAccent : Colors.black,
            ),
          ],
        ),
      ),
    );
  }
}
