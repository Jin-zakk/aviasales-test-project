import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectors from './store/selectors';
import { FC, useEffect, useCallback, useMemo, useState } from 'react';
import thunks from './store/thunks';
import cn from 'classnames';
import {
  VKShareButton,
  FacebookShareButton,
  TwitterShareButton,
  OKShareButton,
  VKIcon,
  FacebookIcon,
  TwitterIcon,
  OKIcon,
} from 'react-share';
import './UserForm.less';

const mainCls = 'ui-user-form';

const UserForm: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const isShared = useSelector(selectors.shared);
  const isEmailed = useSelector(selectors.isEmailed);
  const isShowFinal = useSelector(selectors.isShowFinal);
  const [email, setEmail] = useState(useSelector(selectors.email));

  const handleEmailSubmit = useCallback(
    (event) => {
      dispatch(thunks.changeEmail(email));
      event.preventDefault();
    },
    [dispatch, email]
  );
  const handleEmailChange = useCallback((event) => {
    const value = event.target?.value;
    setEmail(value);
  }, []);
  const handleIsShareClick = useCallback(() => {
    dispatch(thunks.changeShared(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(thunks.loadData());
  }, [dispatch]);

  const shareList = useMemo(
    () => [
      {
        id: 0,
        Component: VKShareButton,
        Icon: VKIcon,
        url: 'https://vk.com/share.php',
      },
      {
        id: 1,
        Component: FacebookShareButton,
        Icon: FacebookIcon,
        url: 'https://www.facebook.com/share.php',
      },
      {
        id: 2,
        Component: TwitterShareButton,
        Icon: TwitterIcon,
        url: 'https://twitter.com/share',
      },
      {
        id: 3,
        Component: OKShareButton,
        Icon: OKIcon,
        url: 'https://connect.ok.ru/offer',
      },
    ],
    []
  );
  const mainClasses = useMemo(
    () =>
      cn([
        {
          [`${mainCls}`]: true,
          [`${mainCls}--is-final`]: isShowFinal,
        },
      ]),
    [isShowFinal]
  );
  const shareClasses = useMemo(
    () =>
      cn([
        {
          [`${mainCls}__form-share`]: true,
          [`${mainCls}__form-share--is-shared`]: isShared,
        },
      ]),
    [isShared]
  );
  const emailClasses = useMemo(
    () =>
      cn([
        {
          [`${mainCls}__form-email`]: true,
          [`${mainCls}__form-email--is-emailed`]: isEmailed,
        },
      ]),
    [isEmailed]
  );

  return (
    <div className={mainClasses}>
      {isShowFinal ? (
        <div className={`${mainCls}__final-block`}>
          <s>выбо</s>
          <br /> Путешествие
          <br /> <strong>близко!</strong>
        </div>
      ) : (
        <div className={`${mainCls}__form`}>
          <div className={`${mainCls}__form-title`}>
            Чтобы выиграть путешествие
          </div>
          <div className={shareClasses}>
            <div className={`${mainCls}__form-share-title`}>
              Поделись с друзьями:
            </div>
            <div className={`${mainCls}__form-share-buttons`}>
              {shareList.map(({ Component, Icon, url, id }) => (
                <Component
                  key={id}
                  url={url}
                  className={`${mainCls}__form-share-button`}
                  onShareWindowClose={handleIsShareClick}
                  disabled={isShared}
                >
                  <Icon />
                </Component>
              ))}
            </div>
          </div>
          <form className={emailClasses} onSubmit={handleEmailSubmit}>
            <div className={`${mainCls}__form-email-title`}>Оставь почту:</div>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              disabled={isEmailed}
              className={`${mainCls}__form-email-input`}
            />
            {!isEmailed && (
              <button type="submit" className={`${mainCls}__form-email-button`}>
                Отправить
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default UserForm;
