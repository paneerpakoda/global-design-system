import 'package:flutter_test/flutter_test.dart';
// Test the standalone consumer example from its source.
// ignore: avoid_relative_lib_imports
import '../lib/main.dart';

void main() {
  testWidgets('catalog opens the core components', (tester) async {
    await tester.pumpWidget(const GlobalDSExample());
    await tester.pumpAndSettle();
    expect(find.text('Core components'), findsOneWidget);
    expect(find.text('RibSelectField<T>'), findsOneWidget);
  });
}
